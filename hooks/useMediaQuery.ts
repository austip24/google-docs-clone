import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const matchQueryList = window.matchMedia(query);
		const handleChange = (e: any) => setMatches(e.matches);
		matchQueryList.addEventListener("change", handleChange);
		return () => matchQueryList.removeEventListener("change", handleChange);
	}, [query]);

	return matches;
};

export default useMediaQuery;
