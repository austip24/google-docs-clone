import React from "react";
import Header from "./Header";
import Template from "./Template";

interface TemplateSectionProps {}

const TemplateSection: React.FC<TemplateSectionProps> = () => {
	return (
		<div className="bg-gray-200 flex items-center justify-center pt-2 pb-4 text-gray-700">
			<div className="max-w-5xl flex flex-col">
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
						title="Letter"
						subtitle="Spearmint"
					/>
					<Template
						imgSrc="/blank_template.png"
						imgAlt="Blank Template"
						title="Letter"
						subtitle="Spearmint"
					/>
					<Template
						imgSrc="/blank_template.png"
						imgAlt="Blank Template"
						title="Letter"
						subtitle="Spearmint"
					/>
					<Template
						imgSrc="/blank_template.png"
						imgAlt="Blank Template"
						title="Letter"
						subtitle="Spearmint"
					/>
				</div>
			</div>
		</div>
	);
};

export default TemplateSection;
