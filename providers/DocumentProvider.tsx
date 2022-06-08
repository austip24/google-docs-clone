import React, { createContext, useContext, useState } from "react";
import {
	DocumentContextType,
	DocumentData,
	Documents,
} from "../types/document";

const DocumentContext = createContext<any>({});

export const useDocumentContext = () => useContext(DocumentContext);

interface DocumentProviderProps {
	children: React.ReactNode;
}

const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
	const [allDocuments, setAllDocuments] = useState<Document[]>();
	const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
	const [currentDocument, setCurrentDocument] = useState<Document | null>();

	return (
		<DocumentContext.Provider
			value={{
				allDocuments,
				setAllDocuments,
				filteredDocuments,
				setFilteredDocuments,
				currentDocument,
				setCurrentDocument,
			}}
		>
			{children}
		</DocumentContext.Provider>
	);
};

export default DocumentProvider;
