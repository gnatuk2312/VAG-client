import { useContext, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";

import { GlobalContext } from "../../../context/state";

const DynamicNavigation = dynamic(() => import("../../../components/admin/admin-navigation"), {
	suspense: true,
});
const DynamicAdminClients = dynamic(() => import("../../../sections/admin/clients/clients"), {
	suspense: true,
});

const Clients = () => {
	const { adminLoggedIn } = useContext(GlobalContext);

	useEffect(() => {
		if (!adminLoggedIn) {
			Router.push("/admin");
		}
	}, []);

	if (adminLoggedIn) {
		return (
			<Suspense fallback="Loading...">
				<DynamicNavigation />
				<DynamicAdminClients />
			</Suspense>
		);
	}

	return null;
};

export default Clients;
