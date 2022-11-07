import { useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { GlobalContext } from "../../../context/state";
import AdminNavigation from "../../../components/admin/admin-navigation";
import AdminClient from "../../../sections/admin/clients/client";
import Favicon from "../../../public/favicon.ico";

const Client = () => {
	const router = useRouter();
	const { id } = router.query;

	const { adminLoggedIn } = useContext(GlobalContext);

	useEffect(() => {
		if (!adminLoggedIn) {
			Router.push("/admin");
		}
	}, []);

	if (adminLoggedIn) {
		return (
			<>
				<Head>
					<title>Клієнт</title>
					<meta name="robots" content="noindex, nofollow" />
					<link rel="shortcut icon" href={Favicon.src} />
				</Head>
				<AdminNavigation />
				<AdminClient clientID={id} />
				<Toaster position="top-center" toastOptions={{ duration: 4000 }} />
			</>
		);
	}

	return null;
};

export default Client;
