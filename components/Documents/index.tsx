import React from "react";
import Header from "./Header";
import Document from "./Document";

interface DocumentsProps {}

const Documents: React.FC<DocumentsProps> = () => {
	return (
		<section className="flex items-center justify-center pt-2 pb-4 text-gray-700 px-2">
			<div className="grow max-w-5xl flex flex-col">
				<Header />
				<div className="flex flex-col">
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
					<Document name="This is a document" dateCreated="06-6-2022" />
				</div>
			</div>
		</section>
	);
};

export default Documents;
