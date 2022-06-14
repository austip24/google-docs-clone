import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useDocumentContext } from "../../../providers/DocumentProvider";
import { useEffect } from "react";
import { Document, SerializedDocumentTimestamp } from "../../../types/document";
import { useAuth } from "../../../providers/AuthContextProvider";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import {
	collection,
	collectionGroup,
	doc,
	DocumentData,
	documentId,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	QuerySnapshot,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import DocHeader from "../../../components/DocHeader";
import TextEditor from "../../../components/TextEditor";

interface DocumentPageProps {
	document: Document;
}

interface Params extends ParsedUrlQuery {
	docId: string;
	uid: string;
}

const DocumentPage: NextPage<DocumentPageProps> = ({ document }) => {
	const { documentName } = document;
	const { setCurrentDocument } = useDocumentContext();
	const router = useRouter();
	const { uid, docId } = router.query;

	useEffect(() => {
		if (document) setCurrentDocument(document);
		// const docPath = `userDocs/${uid}/docs/${docId}`;
		// const docRef = doc(db, docPath);
		// const unsub = onSnapshot(docRef, (doc) => {
		// 	const thisDoc = {
		// 		id: doc.id,
		// 		...doc.data(),
		// 		timestamp: doc.data()!.timestamp.toJSON(),
		// 	};
		// 	setCurrentDocument(thisDoc as Document);
		// });

		// return () => unsub();
	}, [uid, docId, document, setCurrentDocument]);

	return (
		<div className="h-screen dark:bg-slate-700 flex flex-col">
			<Head>
				<title>Google Docs Clone</title>
			</Head>

			<DocHeader title={documentName} />
			<TextEditor />
		</div>
	);
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const userDocsRef = collection(db, "userDocs");
	const userQuery = query(userDocsRef);
	const userSnapshot = await getDocs(userQuery);

	const paths = [];
	for (const userDoc of userSnapshot.docs) {
		const docQuery = query(collection(db, `userDocs/${userDoc}/docs`));
		const docSnapshot = await getDocs(docQuery);
		for (const doc of docSnapshot.docs) {
			paths.push({
				params: {
					docId: doc.id,
					uid: userDoc.id,
				},
			});
		}
	}

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<any, Params> = async ({
	params,
}) => {
	const { docId, uid } = params!;

	const document = await getDoc(doc(db, `userDocs/${uid}/docs/${docId}`));

	if (document.exists()) {
		const thisDoc = {
			id: document.id,
			...document.data(),
			timestamp: document.data().timestamp.toJSON(),
		};
		return {
			props: {
				document: thisDoc,
			},
			revalidate: 1,
		};
	}

	return {
		props: {
			document: {},
		},
	};
};

export default DocumentPage;
