import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useDocumentContext } from "../../../providers/DocumentProvider";
import { useEffect } from "react";
import { Document } from "../../../types/document";
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
	query,
	QuerySnapshot,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import DocHeader from "../../../components/DocHeader";
import TextEditor from "../../../components/TextEditor";

interface DocumentPageProps {
	doc: Document;
}

interface Params extends ParsedUrlQuery {
	docId: string;
	uid: string;
}

const DocumentPage: NextPage<DocumentPageProps> = ({ doc }) => {
	const { documentName } = doc;
	const { setCurrentDocument } = useDocumentContext();

	useEffect(() => {
		if (doc) setCurrentDocument(doc);
	}, [doc, setCurrentDocument]);

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
				doc: thisDoc,
			},
			revalidate: 10,
		};
	}

	return {
		props: {
			doc: {},
		},
	};
};

export default DocumentPage;
