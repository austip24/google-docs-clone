import { Timestamp } from "firebase/firestore";
import { EditorState, RawDraftContentState } from "draft-js";
import React from "react";

export interface SerializedDocumentTimestamp {
	seconds: number;
	nanoseconds: number;
}

export interface DocumentData {
	documentName: string;
	timestamp: Timestamp | SerializedDocumentTimestamp;
	editorState?: RawDraftContentState;
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
	deletedDocuments: Document[];
	setDeletedDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}
