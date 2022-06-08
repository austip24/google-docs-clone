import { FieldValue } from "firebase/firestore";
export interface DocumentData {
	documentName: string;
	timestamp: FieldValue;
	content?: string;
}

export interface Documents {
	[id: string]: DocumentData;
}

export interface DocumentContextType {}
