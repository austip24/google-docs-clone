import React, { createContext, useContext, useState } from "react";
import { DocumentContextType, Document } from "../types/document";

const DocumentContext = createContext<DocumentContextType>({});

export const useDocument = () => useContext(DocumentContext);

interface DocumentProviderProps {
	children: React.ReactNode;
}

const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
	const [documents, setDocuments] = useState<Document[]>();
	const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
	const [currentDocument, setCurrentDocument] = useState<Document | null>();

	return (
		<DocumentContext.Provider value={document}>
			{children}
		</DocumentContext.Provider>
	);
};

export default DocumentProvider;
