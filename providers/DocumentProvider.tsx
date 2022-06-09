import React, { createContext, useContext, useState } from "react";
import { DocumentContextType, DocumentData, Document } from "../types/document";

const DocumentContext = createContext<DocumentContextType>({});

export const useDocumentContext = () => useContext(DocumentContext);

interface DocumentProviderProps {
	children: React.ReactNode;
}

const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
	const [allDocuments, setAllDocuments] = useState<Document[]>();
	const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
	const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

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
