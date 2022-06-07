import React, { useEffect, useRef, useState } from "react";
import tailwindConfig from "../../tailwind.config";
import useMediaQuery from "../../hooks/useMediaQuery";
import Icon from "../Icon";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { ImCross } from "react-icons/im";

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setQuery(e.target.value);

	const handleInputClear = (e: React.MouseEvent<HTMLInputElement>) =>
		setQuery("");

	useEffect(() => {
		console.log(query);
	}, [query]);

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
						onChange={handleInputChange}
						placeholder="Search"
						className="px-10 py-1.5 text-sm text-gray-700 w-full outline-none border-none bg-gray-100 rounded
						focus:bg-white focus:shadow focus:ring-0 transition-all duration-200"
						value={query}
					/>
					{query.length > 0 && (
						<Icon
							Icon={ImCross}
							className="absolute top-[0.07rem] right-1 p-2 text-3xl text-gray-500 rounded-full transition-all duration-200 hover:bg-gray-200 cursor-pointer"
							onClick={handleInputClear}
						/>
					)}
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
						onChange={handleInputChange}
						className={`${
							searchClicked ? "" : "hidden"
						} px-10 py-1.5 text-sm text-gray-700 w-full outline-none border-none bg-gray-100 rounded
						focus:bg-white focus:shadow focus:ring-0 transition-all duration-200`}
						value={query}
					/>
					<Icon
						onClick={toggleSearchClicked}
						Icon={AiOutlineSearch}
						className={`${
							searchClicked ? "hidden" : ""
						} p-2 text-4xl text-gray-500 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 cursor-pointer`}
					/>
					{query.length > 0 && (
						<Icon
							Icon={ImCross}
							className={`${
								searchClicked ? "" : "hidden"
							} absolute top-[0.07rem] right-1 p-2 text-3xl text-gray-500 rounded-full transition-all duration-200 hover:bg-gray-200 cursor-pointer`}
							onClick={handleInputClear}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default SearchBar;
