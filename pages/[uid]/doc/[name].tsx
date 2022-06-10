import type {
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Header from "../../../components/Header";
import DocumentsComponent from "../../../components/Documents";
import TemplateSection from "../../../components/TemplateSection";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useDocumentContext } from "../../../providers/DocumentProvider";
import { useEffect } from "react";
import { Document } from "../../../types/document";
import { useAuth } from "../../../providers/AuthContextProvider";

interface DocumentPageProps {
	doc: Document;
}

const DocumentPage: NextPage<DocumentPageProps> = ({ doc }) => {
	const { user } = useAuth();
	const { allDocuments, setAllDocuments } = useDocumentContext();
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
