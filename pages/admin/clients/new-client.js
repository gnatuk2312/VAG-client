import { useContext, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { GlobalContext } from "../../../context/state";
import AdminNavigation from "../../../components/admin/admin-navigation";
import AdminNewClient from "../../../sections/admin/clients/new-client";

const NewClient = () => {
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
					<title>Добавити клієнта</title>
					<meta name="robots" content="noindex, nofollow" />
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				</Head>
				<AdminNavigation />
				<AdminNewClient />
				<Toaster position="top-center" />
			</>
		);
	}

	return null;
};

export default NewClient;
