import React from "react";
import Icon from "../Icon";
import { TbDotsVertical } from "react-icons/tb";
import { MdFolder } from "react-icons/md";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
	return (
		<div className="flex justify-between items-center mb-2">
			<h2 className="ml-4 font-bold">My Documents</h2>
			<div className="flex items-center justify-center gap-20">
				<h2 className="text-sm font-semibold text-gray-500 ml-1">Date Created</h2>
				<Icon
					Icon={MdFolder}
					className="p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200 mr-2"
				/>
			</div>
		</div>
	);
};

export default Header;
