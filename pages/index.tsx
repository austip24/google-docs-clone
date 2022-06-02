import type { NextPage } from "next";
import Header from "../components/Header";

interface PageProps {}

const Home: NextPage<PageProps> = () => {
	return (
		<div className="">
			<Header />
		</div>
	);
};

export default Home;
