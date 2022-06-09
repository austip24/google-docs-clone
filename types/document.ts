import { Timestamp } from "firebase/firestore";
import React from "react";

type SerializedTimestamp = {
	seconds: number;
	nanoseconds: number;
};

export interface DocumentData {
	documentName: string;
	timestamp: Timestamp | SerializedTimestamp;
	content?: string;
}

export interface Document extends DocumentData {
	id: string;
}

export interface DocumentContextType {
	allDocuments?: Document[];
	setAllDocuments?: React.Dispatch<
		React.SetStateAction<Document[] | undefined>
	>;
	filteredDocuments?: Document[];
	setFilteredDocuments?: React.Dispatch<React.SetStateAction<Document[]>>;
	currentDocument?: Document | null;
	setCurrentDocument?:
		| React.Dispatch<React.SetStateAction<Document | null>>
		| undefined;
}
