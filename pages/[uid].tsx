import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Header from "../components/Header";
import DocumentsComponent from "../components/Documents";
import TemplateSection from "../components/TemplateSection";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useDocumentContext } from "../providers/DocumentProvider";
import { useEffect } from "react";
import { Document } from "../types/document";
import { useAuth } from "../providers/AuthContextProvider";
import { useRouter } from "next/router";

interface UserPageProps {
	docs: Document[];
}

interface Params extends ParsedUrlQuery {
	uid: string;
}

const UserPage: NextPage<UserPageProps> = ({ docs }) => {
	const { setAllDocuments } = useDocumentContext();

	useEffect(() => {
		setAllDocuments(docs);
	}, [docs, setAllDocuments]);

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

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const userDocsRef = collection(db, "userDocs");
	const q = query(userDocsRef);
	const querySnapshot = await getDocs(q);
	const paths = querySnapshot.docs.map((doc) => {
		return {
			params: {
				uid: doc.id,
			},
		};
	});
	console.log(`paths: ${paths}`);
	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<any, Params> = async ({
	params,
}) => {
	const { uid } = params!;

	if (uid === "" || uid === "/") return { props: {} };

	const userDocsRef = collection(db, `userDocs/${uid}/docs`);
	const q = query(userDocsRef, orderBy("timestamp", "desc"));

	const querySnapshot = await getDocs(q);
	const docs = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
		timestamp: doc.data().timestamp.toJSON(),
	}));

	return {
		props: {
			docs,
		},
	};
};

export default UserPage;
