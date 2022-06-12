import React, { useEffect, useRef, useState } from "react";
import { useDocumentContext } from "../../providers/DocumentProvider";
import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";

const Editor = dynamic(
	() => import("react-draft-wysiwyg").then((mod) => mod.Editor) as any,
	{
		ssr: false,
	}
);

interface TextEditorProps {}

const TextEditor: React.FC<TextEditorProps> = () => {
	const [editorState, setEditorState] = useState<EditorState>(() =>
		EditorState.createEmpty()
	);
	const { currentDocument, setCurrentDocument } = useDocumentContext();

	// const focusEditor = () => editor?.current?.focus();

	// useEffect(() => {
	// 	focusEditor();
	// }, []);

	return (
		<div
			className="grow dark:bg-slate-600 dark:text-gray-50 relative overflow-x-hidden"
			// onClick={focusEditor}
		>
			<div className="absolute h-full w-full bg-gray-100 -z-50"></div>
			<Editor
				// @ts-ignore
				editorState={editorState}
				// @ts-ignore
				onEditorStateChange={(editorState) => setEditorState(editorState)}
				toolbarClassName="w-screen shadow-lg dark:shadow-slate-900 text-gray-700"
				editorClassName="bg-white z-50 dark:bg-slate-700 mx-60 my-10 p-12 shadow-2xl dark:shadow-slate-900 grow"
			/>
		</div>
	);
};

export default TextEditor;
