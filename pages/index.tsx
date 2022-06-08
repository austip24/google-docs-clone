import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../providers/AuthContextProvider";

const Home: NextPage = () => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) router.replace(`/${user.uid}`);
	}, [user, router]);
	return <></>;
};

export default Home;
