import React, { useCallback, useEffect, useRef, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { HiDocumentText } from "react-icons/hi";
import Icon from "../Icon";
import { useDocumentContext } from "../../providers/DocumentProvider";
import { useRouter } from "next/router";
import { DocumentContextType } from "../../types/document";
import { Menu, Transition } from "@headlessui/react";

interface DocumentProps {
	docId: string;
	name: string;
	dateCreated: string;
}

const DocumentRow: React.FC<DocumentProps> = ({ name, dateCreated, docId }) => {
	const { setCurrentDocument, allDocuments } = useDocumentContext();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleRowClick: React.MouseEventHandler = (e) =>
		console.log("row clicked");
	const handleIconClick: React.MouseEventHandler = (e) =>
		console.log("icon clicked");
	const handleRemoveClick: React.MouseEventHandler = (e) =>
		console.log("remove clicked");

	return (
		<div className="group relative flex justify-between items-center rounded-3xl hover:bg-blue-100 cursor-pointer py-1 transition-all duration-200 ease-in-out select-none">
			<div
				className="flex items-center justify-between grow"
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
						onClick={handleIconClick}
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
								<button
									className={`${
										active && "bg-gray-200"
									} text-sm font-semibold text-gray-700 w-full rounded-lg text-left p-1 pl-4`}
									onClick={handleRemoveClick}
								>
									Remove
								</button>
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
