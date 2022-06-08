import { NextPage } from "next";
import React, { useEffect } from "react";
import { IoDocumentText } from "react-icons/io5";
import Icon from "../components/Icon";
import { useAuth } from "../providers/AuthContextProvider";
import { useRouter } from "next/router";

const Login: NextPage = () => {
	const { login, user } = useAuth();
	const router = useRouter();

	const handleLogin = async () => {
		try {
			await login();
			if (user) router.push(`/${user.uid}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center gap-4">
			<Icon
				Icon={IoDocumentText}
				className="w-[200px] h-[200px] fill-sky-500 cursor-default"
			/>
			<h1 className="text-5xl text-gray-600">
				<span className="font-bold">Google</span> Docs
			</h1>
			<button
				className="mt-4 px-14 py-2 text-md rounded text-gray-50 bg-sky-500 hover:bg-sky-600 focus:ring-2 ring-sky-500 ring-offset-2 shadow-sky-300 shadow-lg transition-colors duration-200"
				onClick={handleLogin}
			>
				Login
			</button>
		</div>
	);
};

export default Login;
