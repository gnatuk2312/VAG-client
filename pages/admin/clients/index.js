import { useContext, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

import { GlobalContext } from "../../../context/state";
import AdminNavigation from "../../../components/admin/admin-navigation";
import AdminClients from "../../../sections/admin/clients/clients";

const Clients = () => {
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
					<title>Клієнти</title>
					<meta name="robots" content="noindex, nofollow" />
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				</Head>
				<AdminNavigation />
				<AdminClients />
			</>
		);
	}

	return null;
};

export default Clients;
