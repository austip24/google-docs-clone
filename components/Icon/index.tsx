import React from "react";
import { IconType } from "react-icons/lib";
import Link from "next/link";

interface IconProps {
	Icon: IconType;
	className?: string;
	href?: string;
	onClick?: React.MouseEventHandler;
}

const Icon: React.FC<IconProps> = ({ Icon, className, href, onClick }) => {
	return (
		<>
			{href ? (
				<Link href={href}>
					{onClick ? (
						<button onClick={onClick} className={`rounded-full p-0`}>
							<Icon className={className} />
						</button>
					) : (
						<Icon className={className} />
					)}
				</Link>
			) : (
				<>
					{onClick ? (
						<button onClick={onClick} className={`rounded-full p-0`}>
							<Icon className={className} />
						</button>
					) : (
						<Icon className={className} />
					)}
				</>
			)}
		</>
	);
};

export default Icon;
