import React from "react";
import Icon from "../Icon";
import { TbDotsVertical } from "react-icons/tb";

const Header = () => {
	return (
		<div className="flex justify-between items-center">
			<h2 className="ml-4">Start a new document</h2>
			<Icon
				Icon={TbDotsVertical}
				className="p-2 text-4xl text-gray-700 cursor-pointer hover:bg-gray-400 rounded-full transition-all duration-200 mr-2"
			/>
		</div>
	);
};

export default Header;
