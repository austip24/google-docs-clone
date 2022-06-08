import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import useMediaQuery from "../../hooks/useMediaQuery";
import Icon from "../Icon";
import SearchBar from "./SearchBar";
import tailwindConfig from "../../tailwind.config";
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../providers/AuthContextProvider";
import { Menu, Transition } from "@headlessui/react";
import { BiLogOut } from "react-icons/bi";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
	const isMinWidthMedium = useMediaQuery(
		`(min-width: ${tailwindConfig.theme.screens.md})`
	);

	const [searchClicked, toggleSearchClicked] = useToggle(false);

	const { user, logout } = useAuth();

	const handleLogout = useCallback(async () => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	}, [logout]);

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

			{user !== null ? (
				<Menu as="div" className="mx-2 pb-1.5 text-gray-700">
					<div>
						<Menu.Button className="h-6 w-6 cursor-pointer outline-white outline-8 outline hover:outline-gray-200 rounded-full relative transition-all duration-200 ease-in-out">
							<Image
								className="text-gray-700 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200"
								src={`${user.photoURL}`}
								alt="User"
								layout="fill"
								objectFit="cover"
							/>
						</Menu.Button>
						<div>
							<Transition
								as={React.Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-5 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="p-1">
										<Menu.Item>
											{({ active }) => (
												<div
													className={`${
														active ? "bg-gray-200" : "bg-white"
													} group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer`}
													onClick={handleLogout}
												>
													<Icon
														Icon={BiLogOut}
														className="text-gray-700 text-xl"
													/>
													Logout
												</div>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</div>
					</div>
				</Menu>
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
