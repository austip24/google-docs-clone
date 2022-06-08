import type {
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Header from "../../components/Header";
import DocumentsComponent from "../../components/Documents";
import TemplateSection from "../../components/TemplateSection";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useDocumentContext } from "../../providers/DocumentProvider";
import { useEffect } from "react";
import { Documents } from "../../types/document";
import { useAuth } from "../../providers/AuthContextProvider";

interface DocumentPageProps {
	docs: Documents;
}

interface PageParams extends ParsedUrlQuery {
	uid: string;
}

const DocumentPage: NextPage<DocumentPageProps> = ({ docs }) => {
	const { user } = useAuth();
	const { allDocuments, setAllDocuments } = useDocumentContext();
	console.log(docs);
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

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
	const userDocsRef = collection(db, "userDocs");

	const q = query(userDocsRef);
	const querySnapshot = await getDocs(q);

	const paths = querySnapshot.docs.map((doc) => ({
		params: {
			uid: doc.id,
		},
	}));

	console.log(`paths: ${paths}`);

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<any, PageParams> = async (
	context
) => {
	const { uid } = context.params!;
	const q = query(collection(db, `userDocs/${uid}/docs`));

	const querySnapshot = await getDocs(q);
	const docs = querySnapshot.docs.map((doc) => {
		const id = doc.id;
		const data = doc.data();

		const obj: any = {};
		obj[id] = data;
		return obj;
	});

	return {
		props: {
			docs,
		},
		revalidate: 30,
	};
};

export default DocumentPage;
