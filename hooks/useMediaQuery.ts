import { useEffect, useState } from "react";

// Note: This is only meant to be used for client side rendering
// and will not work for server side rendering.
const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		const handleChange = () => {
			setMatches(media.matches);
		};

		media.addEventListener("change", handleChange);
		return () => media.removeEventListener("change", handleChange);
	}, [matches, query]);

	return matches;
};

export default useMediaQuery;
