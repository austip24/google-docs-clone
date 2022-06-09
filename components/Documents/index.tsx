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
		<section className="mx-2 sm:mx-0 flex items-center justify-center pt-2 pb-4 text-gray-700 px-2">
			<div className="grow max-w-4xl flex flex-col">
				<Header />
				<div className="flex flex-col transition-all duration-200 ease-in-out">
					{allDocuments?.map((doc: Document) => {
						const { seconds, nanoseconds } = doc.timestamp;
						const timestamp = new Timestamp(seconds, nanoseconds);

						return (
							<DocumentRow
								key={doc.id}
								docId={doc.id}
								name={doc.documentName}
								dateCreated={timestampToString(timestamp)}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Documents;
