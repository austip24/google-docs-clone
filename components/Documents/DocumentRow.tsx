import React, { useCallback, useEffect, useRef, useState } from "react";
import { TbDotsVertical, TbTrash } from "react-icons/tb";
import { HiDocumentText } from "react-icons/hi";
import Icon from "../Icon";
import { useDocumentContext } from "../../providers/DocumentProvider";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../providers/AuthContextProvider";
import { reauthenticateWithRedirect } from "firebase/auth";

interface DocumentProps {
	docId: string;
	name: string;
	dateCreated: string;
}

const DocumentRow: React.FC<DocumentProps> = ({ name, dateCreated, docId }) => {
	const { user } = useAuth();
	const {
		setCurrentDocument,
		allDocuments,
		setAllDocuments,
		setDeletedDocuments,
	} = useDocumentContext();
	const router = useRouter();

	useEffect(() => {
		router.prefetch(
			`${router.asPath}/doc/[name]`,
			`${router.asPath}/doc/${name}`
		);
	}, [router, name]);

	const handleRowClick: React.MouseEventHandler = useCallback(
		(_) => {
			router.push({
				pathname: `${router.asPath}/doc/[name]`,
				query: { name },
			});
		},
		[router, name]
	);

	const handleRemoveClick: React.MouseEventHandler = useCallback(
		async (_) => {
			try {
				if (!user) return;

				const docPath = `userDocs/${user.uid}/docs/${docId}`;
				await deleteDoc(doc(db, docPath));

				setAllDocuments(
					allDocuments?.filter((doc) => {
						if (doc.id !== docId) {
							return false;
						} else {
							setDeletedDocuments((prev) => [...prev, doc]);
							return true;
						}
					})
				);
			} catch (error) {
				console.error(`Document deletion failed ${error}`);
			}
		},
		[user, docId, setAllDocuments, allDocuments, setDeletedDocuments]
	);

	return (
		<div className="group relative flex justify-between items-center rounded-3xl hover:bg-blue-100 hover:dark:bg-slate-600 cursor-pointer transition-all duration-200 ease-in-out select-none">
			<div
				className="flex items-center justify-between grow py-1"
				onClick={handleRowClick}
			>
				<div className="flex items-center">
					<Icon
						Icon={HiDocumentText}
						className="ml-2 p-2 text-4xl text-sky-500"
					/>
					<h2 className="ml-2 text-sm font-semibold max-w-[225px] md:max-w-sm text-ellipsis overflow-hidden">
						{name}
					</h2>
				</div>
				<div className="mr-14 md:mr-28">
					<h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-300">
						{dateCreated}
					</h2>
				</div>
			</div>
			<Menu>
				<Menu.Button>
					<Icon
						Icon={TbDotsVertical}
						className="absolute right-0 top-1 p-2 text-4xl cursor-pointer hover:bg-gray-300 hover:dark:bg-slate-500 rounded-full transition-all duration-200 ease-in-out mr-2"
					/>
				</Menu.Button>
				<Transition
					as={React.Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-4 -bottom-9 w-36 divide divide-gray-100 bg-white dark:bg-slate-700 p-1 rounded-lg shadow-xl z-50 dark:shadow-slate-900 ring-1 ring-black dark:ring-slate-400 ring-opacity-5 focus:outline-none">
						<Menu.Item>
							{({ active }) => (
								<div
									className={`${
										active
											? "bg-gray-200 dark:bg-slate-600"
											: "bg-white dark:bg-slate-700"
									} flex items-center text-xs font-semibold w-full rounded-lg text-left p-1 pl-2 gap-2 transition-all duration-200 ease-in-out`}
									onClick={handleRemoveClick}
								>
									<Icon Icon={TbTrash} className="h-5 w-5" />
									Remove
								</div>
							)}
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
			<div className="group-hover:opacity-0 absolute bottom-0 left-0 bg-gray-200 h-[1px] w-full transition-all duration-200 ease-in-out"></div>
		</div>
	);
};

export default DocumentRow;
