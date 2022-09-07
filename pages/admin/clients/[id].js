import { useContext, useEffect } from "react";
import Router from "next/router";
import { Toaster } from "react-hot-toast";

import { GlobalContext } from "../../../context/state";
import AdminNavigation from "../../../components/admin/admin-navigation";
import AdminClient from "../../../sections/admin/clients/client";

const Client = () => {
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
				<AdminClient />
				<Toaster position="top-center" toastOptions={{ duration: 4000 }} />
			</>
		);
	}

	return null;
};

export default Client;
