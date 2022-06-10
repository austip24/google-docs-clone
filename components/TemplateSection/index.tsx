import React from "react";
import Header from "./Header";
import Template from "./Template";

interface TemplateSectionProps {}

const TemplateSection: React.FC<TemplateSectionProps> = () => {
	return (
		<section className="bg-gray-200 dark:bg-slate-800 flex items-center justify-center pt-2 pb-4 dark:text-gray-50">
			<div className="grow max-w-4xl flex flex-col">
				<Header />
				<div className="flex gap-5 flex-wrap p-2">
					<Template
						imgSrc="/blank_template.png"
						imgAlt="Blank Template"
						title="Blank"
					/>
					<Template
						imgSrc="/blank_template.png"
						imgAlt="Blank Template"
						title="Blank"
						subtitle="hello"
					/>
					<Template
						imgSrc="/blank_template.png"
						imgAlt="Blank Template"
						title="Blank"
					/>
				</div>
			</div>
		</section>
	);
};

export default TemplateSection;
