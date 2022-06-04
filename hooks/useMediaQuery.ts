import { useEffect, useState } from "react";

// Note: This is only meant to be used for client side rendering
// and will not work for server side rendering.
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
