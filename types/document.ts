import { Timestamp } from "firebase/firestore";
import React from "react";

type SerializedDocumentTimestamp = {
	seconds: number;
	nanoseconds: number;
};

export interface DocumentData {
	documentName: string;
	timestamp: Timestamp | SerializedDocumentTimestamp;
	content?: string;
}

export interface Document extends DocumentData {
	id: string;
}

export interface DocumentContextType {
	allDocuments: Document[];
	setAllDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
	filteredDocuments: Document[];
	setFilteredDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
	currentDocument: Document;
	setCurrentDocument: React.Dispatch<React.SetStateAction<Document>>;
}
