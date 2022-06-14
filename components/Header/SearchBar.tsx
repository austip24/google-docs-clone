import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { ImCross } from "react-icons/im";

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
		// if (!isMinWidthMedium && query.length > 0) {
		// 	if (!searchClicked && toggleSearchClicked) toggleSearchClicked();
		// 	inputRef.current?.focus();
		// }
	}, [isMinWidthMedium, searchClicked, toggleSearchClicked, inputRef, query]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setQuery(e.target.value);

	const handleInputClear = (e: React.MouseEvent<HTMLInputElement>) =>
		setQuery("");

	return (
		<>
			{isMinWidthMedium ? (
				<div className="flex items-center justify-center grow">
					<div className="grow max-w-xl relative">
						<Icon
							Icon={AiOutlineSearch}
							className="absolute top-[0.07rem] left-1 p-1 text-3xl rounded-full transition-all duration-200 hover:bg-gray-200 hover:dark:bg-slate-600 cursor-pointer"
						/>
						<input
							ref={inputRef}
							type="text"
							onChange={handleInputChange}
							placeholder="Search"
							className="w-full px-10 py-1.5 text-sm outline-none border-none bg-gray-100 dark:bg-slate-800 rounded
						focus:bg-white focus:dark:bg-slate-700 focus:shadow focus:dark:shadow-slate-500 focus:ring-0 focus:dark:ring-1 focus:dark:ring-slate-500 transition-all duration-200 placeholder:dark:text-slate-400"
							value={query}
						/>
						{query.length > 0 && (
							<Icon
								Icon={ImCross}
								className="absolute top-[0.07rem] right-1 p-2 text-3xl rounded-full transition-all duration-200 hover:bg-gray-200 hover:dark:bg-slate-600 cursor-pointer"
								onClick={handleInputClear}
							/>
						)}
					</div>
				</div>
			) : (
				<div className="flex items-center justify-end relative grow">
					<div className="grow max-w-xl relative">
						<Icon
							onClick={toggleSearchClicked}
							Icon={BiArrowBack}
							className={`${
								searchClicked ? "" : "hidden"
							} absolute top-[0.07rem] left-1 p-1 text-3xl rounded-full transition-all duration-200 hover:bg-gray-200 hover:dark:bg-slate-600 cursor-pointer`}
						/>
						<input
							ref={inputRef}
							type="text"
							placeholder="Search"
							autoFocus
							onChange={handleInputChange}
							className={`${
								searchClicked ? "" : "hidden"
							} w-full px-10 py-1.5 text-sm outline-none border-none bg-gray-100 dark:bg-slate-800 rounded
						focus:bg-white focus:dark:bg-slate-700 focus:shadow focus:dark:shadow-slate-500 focus:ring-0 focus:dark:ring-1 focus:dark:ring-slate-500 transition-all duration-200 placeholder:dark:text-slate-400`}
							value={query}
						/>
					</div>
					<Icon
						onClick={toggleSearchClicked}
						Icon={AiOutlineSearch}
						className={`${
							searchClicked ? "hidden" : ""
						} p-2 text-4xl rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 hover:dark:bg-slate-600 cursor-pointer`}
					/>
					{query.length > 0 && (
						<Icon
							Icon={ImCross}
							className={`${
								searchClicked ? "" : "hidden"
							} absolute top-[0.07rem] right-1 p-2 text-3xl rounded-full transition-all duration-200 hover:bg-gray-200 hover:dark:bg-slate-600 cursor-pointer`}
							onClick={handleInputClear}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default SearchBar;
