import type { NextPage } from "next";
import Head from "next/head";
import { useDocumentContext } from "../../../providers/DocumentProvider";
import { useEffect } from "react";
import { Document } from "../../../types/document";
import { useAuth } from "../../../providers/AuthContextProvider";
import { useRouter } from "next/router";

interface DocumentPageProps {}

const DocumentPage: NextPage<DocumentPageProps> = () => {
	const { currentDocument, setCurrentDocument, allDocuments } =
		useDocumentContext();
	const router = useRouter();
	const { uid, name } = router.query;

	useEffect(() => {
		// find document by name
		console.log(`All Documents: ${JSON.stringify(allDocuments)}`);
		const doc = allDocuments.find((doc) => doc.documentName === name);
		if (doc) setCurrentDocument(doc);
		else console.log(`document with name ${name} not found`);
	}, [allDocuments, setCurrentDocument, name]);

	useEffect(() => {
		console.log(`Current document: ${JSON.stringify(currentDocument)}`);
	}, [currentDocument]);

	useEffect(() => {
		// console.log(`All Documents: ${JSON.stringify(allDocuments)}`);
	}, [allDocuments]);

	return (
		<div>
			<Head>
				<title>Google Docs Clone</title>
			</Head>

			<div className="font-bold text-rose-500 text-5xl text-center">
				Hello world!!
			</div>
		</div>
	);
};

export default DocumentPage;
