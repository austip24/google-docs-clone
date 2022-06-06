import { useState } from "react";

type ToggleFunction = () => void;
type HookReturn = [boolean, ToggleFunction];

const useToggle = (initialValue: boolean = false): HookReturn => {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggle: ToggleFunction = () => setValue(!value);

	return [value, toggle];
};

export default useToggle;
