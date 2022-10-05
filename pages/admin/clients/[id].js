import { useContext, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import { GlobalContext } from "../../../context/state";

const DynamicNavigation = dynamic(() => import("../../../components/admin/admin-navigation"), {
	suspense: true,
});
const DynamicAdminClient = dynamic(() => import("../../../sections/admin/clients/client"), {
	suspense: true,
});

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
			<Suspense fallback="Loading...">
				<DynamicNavigation />
				<DynamicAdminClient clientID={id} />
				<Toaster position="top-center" toastOptions={{ duration: 4000 }} />
			</Suspense>
		);
	}

	return null;
};

export default Client;
