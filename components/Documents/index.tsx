import React from "react";
import Header from "./Header";
import DocumentRow from "./DocumentRow";
import { useDocumentContext } from "../../providers/DocumentProvider";
import { timeStamp } from "console";
import { Document } from "../../types/document";
import { Timestamp } from "firebase/firestore";

interface DocumentsProps {}

const Documents: React.FC<DocumentsProps> = () => {
	const { allDocuments, filteredDocuments, setFilteredDocuments } =
		useDocumentContext();

	const timestampToString = (timestamp: Timestamp) => {
		const date = timestamp.toDate();
		return date.toLocaleDateString();
	};

	return (
		<section className="flex items-center justify-center pt-2 pb-4 text-gray-700 px-2">
			<div className="grow max-w-5xl flex flex-col">
				<Header />
				<div className="flex flex-col">
					{allDocuments?.map((doc: Document) => {
						const { seconds, nanoseconds } = doc.timestamp;
						const timestamp = new Timestamp(seconds, nanoseconds);

						return (
							<DocumentRow
								key={doc.id}
								name={doc.documentName}
								dateCreated={timestampToString(timestamp)}
							/>
						);
					})}
					{/* <DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" />
					<DocumentRow name="This is a document" dateCreated="06-6-2022" /> */}
				</div>
			</div>
		</section>
	);
};

export default Documents;
