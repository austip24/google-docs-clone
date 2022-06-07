import React, { useEffect, useRef, useState } from "react";
import tailwindConfig from "../../tailwind.config";
import useMediaQuery from "../../hooks/useMediaQuery";
import Icon from "../Icon";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

const people = [
	"Durward Reynolds",
	"Kenton Towne",
	"Therese Wunsch",
	"Benedict Kessler",
	"Katelyn Rohan",
];

interface SearchBarProps {
	isMinWidthMedium?: boolean; // If true, the search bar will be a larger version
	searchClicked?: boolean;
	toggleSearchClicked?: () => void; // Function to toggle the search bar open/closed
}

const SearchBar: React.FC<SearchBarProps> = ({
	isMinWidthMedium,
	searchClicked,
	toggleSearchClicked,
}) => {
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (!isMinWidthMedium && searchClicked) {
			inputRef.current?.focus();
		}
	}, [isMinWidthMedium, searchClicked, inputRef]);

	return (
		<>
			{isMinWidthMedium ? (
				<div className="flex items-center justify-center relative grow">
					<Icon
						Icon={AiOutlineSearch}
						className="absolute top-[0.07rem] left-1 p-1 text-3xl text-gray-500 rounded-full transition-all duration-200 hover:bg-gray-200 cursor-pointer"
					/>
					<input
						ref={inputRef}
						type="text"
						placeholder="Search"
						className="pl-10 py-1.5 text-sm text-gray-700 w-full outline-none border-none bg-gray-100 rounded
						focus:bg-white focus:shadow focus:ring-0 transition-all duration-200
						"
					/>
				</div>
			) : (
				<div className="flex items-center justify-end relative grow">
					<Icon
						onClick={toggleSearchClicked}
						Icon={BiArrowBack}
						className={`${
							searchClicked ? "" : "hidden"
						} absolute top-[0.07rem] left-1 p-1 text-3xl text-gray-500 rounded-full transition-all duration-200 hover:bg-gray-200 cursor-pointer`}
					/>
					<input
						ref={inputRef}
						type="text"
						placeholder="Search"
						autoFocus
						className={`${
							searchClicked ? "" : "hidden"
						} pl-10 py-1.5 text-sm text-gray-700 w-full outline-none border-none bg-gray-100 rounded
						focus:bg-white focus:shadow focus:ring-0 transition-all duration-200`}
					/>
					<Icon
						onClick={toggleSearchClicked}
						Icon={AiOutlineSearch}
						className={`${
							searchClicked ? "hidden" : ""
						} p-2 text-4xl text-gray-500 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 cursor-pointer`}
					/>
				</div>
			)}
		</>
	);
};

export default SearchBar;
