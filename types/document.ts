import { Timestamp } from "firebase/firestore";

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

export interface DocumentContextType {}
