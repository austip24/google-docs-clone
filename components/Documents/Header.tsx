import React from "react";
import Icon from "../Icon";
import { MdFolder } from "react-icons/md";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
	return (
		<div className="group relative flex justify-between items-center pt-1 pb-2">
			<div className="flex items-center justify-between grow">
				<h2 className="ml-4 font-bold">My Documents</h2>
			</div>
			<div className="mr-14 md:mr-28">
				<h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
					Date Created
				</h2>
			</div>
			<Icon
				Icon={MdFolder}
				className="absolute right-0 top-0 p-2 text-4xl cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-600 rounded-full transition-all duration-200 ease-in-out mr-2"
			/>
		</div>
	);
};

export default Header;
