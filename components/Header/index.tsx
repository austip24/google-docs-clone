import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import useMediaQuery from "../../hooks/useMediaQuery";
import HeaderIcon from "./Icon";
import SearchBar from "./SearchBar";
import tailwindConfig from "../../tailwind.config";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
	const isMedium = useMediaQuery(
		`(min-width: ${tailwindConfig.theme.screens.md})`
	);

	return (
		<div className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
			{/* Hamburger menu icon */}
			<HeaderIcon
				Icon={AiOutlineMenu}
				className="p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200"
			/>

			{/* Document icon */}
			<Link href="/">
				<a className="inline-flex mx-2 md:mx-5">
					<HeaderIcon
						Icon={IoDocumentText}
						className="hidden md:block text-3xl cursor-pointer fill-sky-500"
					/>
					{/* Docs */}
					<h1 className="ml-1 text-gray-700 text-2xl">Docs</h1>
				</a>
			</Link>

			{/* Search bar */}
			{/* <SearchBar className="flex flex-grow justify-end items-center px-2 py-1 bg-white rounded-md group md:bg-gray-100 md:justify-start relative">
				<HeaderIcon
					Icon={AiOutlineSearch}
					className="absolute p-2 text-4xl text-gray-500 rounded-full transition-all duration-200 hover:bg-gray-200 cursor-pointer"
				/>
				<input
					type="text"
					placeholder="Search"
					className="hidden md:inline border-none focus:ring-0 placeholder-gray-500 w-full bg-gray-100 text-gray-700 group-focus:bg-gray-50"
				/>
			</SearchBar> */}
		</div>
	);
};

export default Header;
