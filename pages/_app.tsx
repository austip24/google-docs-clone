import "../styles/globals.css";
import type { AppProps } from "next/app";
import DocumentProvider from "../providers/DocumentProvider";
import AuthContextProvider, { useAuth } from "../providers/AuthContextProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<AuthContextProvider>
			<DocumentProvider>
				<Component {...pageProps} />
			</DocumentProvider>
		</AuthContextProvider>
	);
};

export default App;
