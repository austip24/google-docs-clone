import "../styles/globals.css";
import type { AppProps } from "next/app";
import DocumentProvider from "../providers/DocumentProvider";
import AuthContextProvider, { useAuth } from "../providers/AuthContextProvider";
import ProtectedRoute from "../providers/ProtectedRoute";
import { useRouter } from "next/router";

const noAuthRequired = ["/login"];

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const router = useRouter();

	return (
		<AuthContextProvider>
			<DocumentProvider>
				{noAuthRequired.includes(router.pathname) ? (
					<Component {...pageProps} />
				) : (
					<ProtectedRoute>
						<Component {...pageProps} />
					</ProtectedRoute>
				)}
			</DocumentProvider>
		</AuthContextProvider>
	);
};

export default App;
