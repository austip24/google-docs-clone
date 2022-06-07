import React from "react";
import Image from "next/image";

interface TemplateCardProps {
	imgSrc: string;
	imgAlt: string;
	title: string;
	subtitle?: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
	imgSrc,
	imgAlt,
	title,
	subtitle,
}) => {
	return (
		<div>
			<div className="w-[200px] h-[250px] flex flex-col gap-2">
				<button className="border-2 border-gray-300 hover:border-sky-500 rounded-md mb-2 w-full h-full relative overflow-hidden transition-colors duration-150">
					<Image src={imgSrc} alt={imgAlt} layout="fill" quality={100} />
				</button>
			</div>
			<div className="flex flex-col pl-2 cursor-default select-none">
				<h3 className="text-xs font-bold">{title}</h3>
				<h4 className="text-xs text-gray-500">{subtitle}</h4>
			</div>
		</div>
	);
};

export default TemplateCard;
