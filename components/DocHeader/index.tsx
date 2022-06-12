import React, { useCallback, useState } from "react";
import Icon from "../Icon";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { IoDocumentText } from "react-icons/io5";
import { useAuth } from "../../providers/AuthContextProvider";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineUser, AiFillLock } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import { HiDocumentText } from "react-icons/hi";

interface DocHeaderProps {
	title: string;
}

const DocHeader: React.FC<DocHeaderProps> = ({ title }) => {
	const router = useRouter();
	const { uid } = router.query;
	const { user, logout } = useAuth();
	const [docTitle, setDocTitle] = useState(title);

	const handleOnTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setDocTitle(e.target.value);
	};

	const handleLogout = useCallback(async () => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	}, [logout]);

	return (
		<div
			className={`sticky top-0 h-16 z-50 flex items-center justify-between py-2 gap-1 bg-white dark:bg-slate-700 border-b border-gray-200 dark:border-slate-400 text-gray-700 dark:text-gray-50 `}
		>
			{/* Document icon */}
			<div className="flex">
				<Link href={`/[uid]`} as={`/${uid}`}>
					<a className={`inline-flex md:mx-3`}>
						<Icon
							Icon={IoDocumentText}
							className="text-4xl cursor-pointer fill-sky-500 "
						/>
					</a>
				</Link>
			</div>
			<div className="flex flex-col grow overflow-hidden py-2 px-2">
				<input
					type="text"
					value={docTitle}
					onChange={handleOnTitleChange}
					style={{ width: `${docTitle.length + 1}ch` }}
					className="max-w-full -ml-1 px-1 py-0.5 text-sm outline-none border-none font-semibold text-gray-400 dark:text-gray-300 dark:bg-slate-700 rounded-sm hover:ring-1 focus:text-gray-700 focus:dark:text-gray-200 focus:ring-2 ring-gray-200 dark:ring-slate-400 focus:ring-sky-500 focus:dark:ring-slate-400 transition-transform duration-100 tracking-wider"
				/>
				<div className="flex gap-1 text-xs -mb-1">
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						File
					</div>
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						Edit
					</div>
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						View
					</div>
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						Insert
					</div>
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						Format
					</div>
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						Tools
					</div>
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						Extensions
					</div>
					<div className="p-1 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 transition-colors duration-200 rounded-sm">
						Help
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center gap-4">
				<button className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:dark:ring-offset-slate-600 text-xs text-gray-50 rounded-lg font-bold">
					<Icon Icon={AiFillLock} />
					Share
				</button>
				{user !== null ? (
					<Menu as="div" className="mr-4 ">
						<div>
							<Menu.Button className="h-8 w-8 cursor-pointer outline-white dark:outline-slate-700 outline-8 outline hover:outline-gray-200 hover:dark:outline-slate-600 rounded-full relative transition-all duration-200 ease-in-out">
								<Image
									className="cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200"
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
									<Menu.Items className="absolute right-5 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-700 shadow-lg dark:shadow-slate-900 ring-1 ring-black dark:ring-slate-400 ring-opacity-5 focus:outline-none">
										<div className="p-1">
											<Menu.Item>
												{({ active }) => (
													<div
														className={`${
															active
																? "bg-gray-200 dark:bg-slate-600"
																: "bg-white dark:bg-slate-700"
														} group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer`}
														onClick={handleLogout}
													>
														<Icon Icon={BiLogOut} className="text-xl" />
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
						className="p-2 text-4xl cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 rounded-full transition-all duration-200"
					/>
				)}
			</div>
		</div>
	);
};

export default DocHeader;
