import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Documents from "../components/Documents";
import TemplateSection from "../components/TemplateSection";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
	return (
		<div>
			<Head>
				<title>Google Docs Clone</title>
			</Head>

			<Header />
			<TemplateSection />
			<Documents />
		</div>
	);
};

export default Home;
