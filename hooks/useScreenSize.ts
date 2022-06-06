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
