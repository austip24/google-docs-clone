import { useState, useEffect } from "react";

export type Dimensions = {
	width: number;
	height: number;
};

export const getWindowDimensions = (): Dimensions => {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
};

// Note: This is only meant to be used for client side rendering
// and will not work for server side rendering.
const useWindowDimensions = (): Dimensions => {
	const [windowDimensions, setWindowDimensions] = useState<Dimensions>(
		getWindowDimensions()
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
