import type {
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Header from "../components/Header";
import DocumentsComponent from "../components/Documents";
import TemplateSection from "../components/TemplateSection";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useDocumentContext } from "../providers/DocumentProvider";
import { useEffect } from "react";
import { Documents } from "../types/document";
import { useAuth } from "../providers/AuthContextProvider";

interface HomeProps {
}

const Home: NextPage<HomeProps> = () => {
	const { user } = useAuth();
	const { allDocuments, setAllDocuments } = useDocumentContext();
	return (
		<div>
			<Head>
				<title>Google Docs Clone</title>
			</Head>

			<Header />
			<TemplateSection />
			<DocumentsComponent />
		</div>
	);
};

export default Home;
