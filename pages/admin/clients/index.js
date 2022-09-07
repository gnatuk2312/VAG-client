import { useContext, useEffect } from "react";
import Router from "next/router";

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
				<AdminNavigation />
				<AdminClients />
			</>
		);
	}

	return null;
};

export default Clients;
