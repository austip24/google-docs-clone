import {
	User,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export type AuthContextType = {
	user: User | null;
	login: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null as any);

export const useAuth = () => useContext(AuthContext);

interface AuthContextProviderProps {
	children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const login = useCallback(async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);

			console.error(errorCode, errorMessage, email, credential);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
