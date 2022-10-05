import { useContext, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import { Toaster } from "react-hot-toast";

import { GlobalContext } from "../../context/state";

const DynamicNavigation = dynamic(() => import("../../components/admin/admin-navigation"), {
	suspense: true,
});
const DynamicAdminBookAppointment = dynamic(() => import("../../sections/admin/book-appointment"), {
	suspense: true,
});

const BookAppointment = () => {
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
				<DynamicAdminBookAppointment />
				<Toaster position="top-center" />
			</Suspense>
		);
	}

	return null;
};

export default BookAppointment;
