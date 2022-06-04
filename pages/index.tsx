import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

interface PageProps {}

const Home: NextPage<PageProps> = () => {
	return (
		<div>
			<Head>
				<title>Google Docs Clone</title>
			</Head>

			<Header />
		</div>
	);
};

export default Home;
