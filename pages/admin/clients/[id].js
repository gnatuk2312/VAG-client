import { useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import { GlobalContext } from "../../../context/state";
import AdminNavigation from "../../../components/admin/admin-navigation";
import AdminClient from "../../../sections/admin/clients/client";

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
				<AdminNavigation />
				<AdminClient clientID={id} />
				<Toaster position="top-center" toastOptions={{ duration: 4000 }} />
			</>
		);
	}

	return null;
};

export default Client;
