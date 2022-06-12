import React, { useState } from "react";
import Icon from "../Icon";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoDocumentText } from "react-icons/io5";

interface DocHeaderProps {
	title: string;
}

const DocHeader: React.FC<DocHeaderProps> = ({ title }) => {
	const router = useRouter();
	const { uid } = router.query;
	const [docTitle, setDocTitle] = useState(title);

	const handleOnTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setDocTitle(e.target.value);
	};

	// const handleOnTitleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
	// 	e.target.style.width = docTitle.length +
	// }

	return (
		<div
			className={`sticky top-0 h-16 z-50 flex items-center py-2 gap-1 bg-white dark:bg-slate-700 border-b border-gray-200 text-gray-700 dark:text-gray-50 `}
		>
			{/* Document icon */}
			<div className="flex">
				<Link href={`[uid]`} as={`${uid}`}>
					<a className={`inline-flex md:mx-3`}>
						<Icon
							Icon={IoDocumentText}
							className="text-4xl cursor-pointer fill-sky-500"
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
				</div>
			</div>
		</div>
	);
};

export default DocHeader;
