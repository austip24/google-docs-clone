import React from "react";
import { TbDotsVertical } from "react-icons/tb";
import { HiDocumentText } from "react-icons/hi";
import Icon from "../Icon";

interface DocumentProps {
	name: string;
	dateCreated: string;
}

const DocumentRow: React.FC<DocumentProps> = ({ name, dateCreated }) => {
	return (
		<div className="group relative flex justify-between items-center rounded-3xl hover:bg-blue-100 cursor-pointer py-1 transition-colors duration-200 ease-in-out">
			<div className="flex items-center">
				<Icon
					Icon={HiDocumentText}
					className="ml-2 p-2 text-4xl text-sky-500 mr-2"
				/>
				<h2 className="ml-2 text-sm font-semibold">{name}</h2>
			</div>
			<div className="flex items-center justify-center gap-20">
				<h2 className="text-sm font-semibold text-gray-500 ml-1">
					{dateCreated}
				</h2>
				<Icon
					Icon={TbDotsVertical}
					className="p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-200 ease-in-out mr-2"
				/>
			</div>
			<div className="group-hover:opacity-0 absolute bottom-0 left-0 bg-gray-200 h-[1px] w-full transition-all duration-200 ease-in-out"></div>
		</div>
	);
};

export default DocumentRow;
