import React from "react";
import { IconType } from "react-icons/lib";
import Link from "next/link";

interface IconProps {
	Icon: IconType;
	className?: string;
	href?: string;
}

const Icon: React.FC<IconProps> = ({ Icon, className, href }) => {
	return (
		<>
			{href ? (
				<Link href={href}>
					<Icon className={className} />
				</Link>
			) : (
				<Icon className={className} />
			)}
		</>
	);
};

export default Icon;
