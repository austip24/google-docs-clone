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

interface DocumentProps {
	docId: string;
	name: string;
	dateCreated: string;
}

const DocumentRow: React.FC<DocumentProps> = ({ name, dateCreated, docId }) => {
	const { user } = useAuth();
	const { setCurrentDocument, allDocuments, setAllDocuments } =
		useDocumentContext();
	const router = useRouter();

	const handleRowClick: React.MouseEventHandler = useCallback(
		(_) => {
			if (!setCurrentDocument) {
				return;
			}

			const currDoc = allDocuments?.find((doc) => doc.id === docId);

			if (currDoc) {
				setCurrentDocument(currDoc);
			}

			router.push(`${router.asPath}/doc/${docId}`);
		},
		[docId, setCurrentDocument, allDocuments, router]
	);

	const handleRemoveClick: React.MouseEventHandler = useCallback(
		async (_) => {
			try {
				const docPath = `userDocs/${user?.uid}/docs/${docId}`;
				await deleteDoc(doc(db, docPath));
				setAllDocuments(allDocuments?.filter((doc) => doc.id !== docId));
			} catch (error) {
				console.error(`Document deletion failed ${error}`);
			}
		},
		[user, docId, setAllDocuments, allDocuments]
	);

	return (
		<div className="group relative flex justify-between items-center rounded-3xl hover:bg-blue-100 cursor-pointer transition-all duration-200 ease-in-out select-none">
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
					<h2 className="text-sm font-semibold text-gray-500">{dateCreated}</h2>
				</div>
			</div>
			<Menu>
				<Menu.Button>
					<Icon
						Icon={TbDotsVertical}
						className="absolute right-0 top-1 p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-200 ease-in-out mr-2"
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
					<Menu.Items className="absolute right-4 -bottom-9 w-36 bg-white p-1 rounded-lg shadow-xl z-50 border-gray-300 border">
						<Menu.Item>
							{({ active }) => (
								<div
									className={`${
										active && "bg-gray-200"
									} flex items-center text-xs font-semibold text-gray-700 w-full rounded-lg text-left p-1 pl-2 gap-2`}
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
