import { GlobalProvider } from "../context/state";
import "../styles/index.scss";

const MyApp = ({ Component, pageProps }) => (
	<GlobalProvider>
		<Component {...pageProps} />
	</GlobalProvider>
);

export default MyApp;
