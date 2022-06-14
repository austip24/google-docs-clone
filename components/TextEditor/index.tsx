import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useDocumentContext } from "../../providers/DocumentProvider";
import {
	convertFromRaw,
	convertToRaw,
	EditorState,
	RawDraftContentState,
} from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import { useThrottle } from "rooks";

const Editor = dynamic(
	() => import("react-draft-wysiwyg").then((mod) => mod.Editor) as any,
	{
		ssr: false,
	}
);

interface TextEditorProps {}

const TextEditor: React.FC<TextEditorProps> = () => {
	const { currentDocument } = useDocumentContext();
	const [editorState, setEditorState] = useState<EditorState>(() =>
		EditorState.createEmpty()
	);
	const [throttledEditorState, setThrottledEditorState] =
		useState<EditorState>(editorState);
	const router = useRouter();
	const { uid, docId } = useMemo(() => router.query, [router.query]);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
		undefined
	);

	const save = useCallback(async () => {
		try {
			const docPath = `userDocs/${uid}/docs/${docId}`;
			const docRef = doc(db, docPath);
			await updateDoc(docRef, {
				editorState: convertToRaw(editorState.getCurrentContent()),
			});
		} catch (error) {
			console.error(`error saving document: ${error}`);
		}
	}, [uid, docId, editorState]);

	const handleThrottledSave = useCallback(async () => {
		setThrottledEditorState(editorState);
		await save();
	}, [save, editorState]);

	const [throttledSave, isReady] = useThrottle(handleThrottledSave, 5000);

	useEffect(() => {
		if (currentDocument?.editorState) {
			setEditorState(
				EditorState.createWithContent(
					convertFromRaw(currentDocument.editorState)
				)
			);
		}
	}, [currentDocument]);

	const handleEditorStateChange = (editorState: EditorState) => {
		setEditorState(editorState);

		// debounce save
		clearTimeout(timeoutId);
		const timeout = setTimeout(() => {
			(async () => {
				await save();
			})();
		}, 2500);
		setTimeoutId(timeout);

		// throttle save
		throttledSave(editorState);
	};

	return (
		<div
			className="min-w-2xl grow dark:bg-slate-600 dark:text-gray-50 relative overflow-x-hidden"
			// onClick={focusEditor}
		>
			<div className="absolute h-full w-full bg-gray-100 -z-50"></div>
			<Editor
				// @ts-ignore
				editorState={editorState}
				// @ts-ignore
				onEditorStateChange={handleEditorStateChange}
				toolbarClassName="w-screen shadow-lg dark:shadow-slate-900 text-gray-700"
				editorClassName="max-w-4xl bg-white z-50 dark:bg-slate-700 mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-auto my-10 p-12 shadow-2xl dark:shadow-slate-900"
			/>
		</div>
	);
};

export default TextEditor;
