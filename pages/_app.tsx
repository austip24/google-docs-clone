import "../styles/globals.css";
import type { AppProps } from "next/app";
import DocumentProvider from "../providers/DocumentProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<DocumentProvider>
			<Component {...pageProps} />
		</DocumentProvider>
	);
};

export default App;
