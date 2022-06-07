import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import useMediaQuery from "../../hooks/useMediaQuery";
import Icon from "../Icon";
import SearchBar from "./SearchBar";
import tailwindConfig from "../../tailwind.config";
import useToggle from "../../hooks/useToggle";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
	const isMinWidthMedium = useMediaQuery(
		`(min-width: ${tailwindConfig.theme.screens.md})`
	);

	const [searchClicked, toggleSearchClicked] = useToggle(false);

	const [user, setUser] = useState<boolean>(false);

	return (
		<div className="sticky top-0 h-12 z-50 flex items-center px-4 py-2 shadow-md bg-white gap-1">
			{/* Hamburger menu icon */}
			<Icon
				Icon={AiOutlineMenu}
				className={`${!isMinWidthMedium && searchClicked ? "hidden" : ""} 
					p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200`}
			/>

			{/* Document icon */}
			<Link href="/">
				<a
					className={`${
						!isMinWidthMedium && searchClicked ? "hidden" : ""
					} inline-flex md:mx-3`}
				>
					<Icon
						Icon={IoDocumentText}
						className="hidden md:block text-2xl cursor-pointer fill-sky-500"
					/>
					{/* Docs */}
					<h1 className="ml-1 text-gray-700 text-2xl">Docs</h1>
				</a>
			</Link>

			{/* Search bar */}
			<SearchBar
				isMinWidthMedium={isMinWidthMedium}
				searchClicked={searchClicked}
				toggleSearchClicked={toggleSearchClicked}
			/>

			<Icon
				Icon={TbGridDots}
				className="p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200"
			/>

			{user ? (
				<div>User</div>
			) : (
				<Icon
					Icon={AiOutlineUser}
					className="p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200"
				/>
			)}
		</div>
	);
};

export default Header;
