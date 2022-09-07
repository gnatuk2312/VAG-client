import { useContext, useEffect } from "react";
import Router from "next/router";
import { Toaster } from "react-hot-toast";

import { GlobalContext } from "../../context/state";
import AdminNavigation from "../../components/admin/admin-navigation";
import AdminBookAppointment from "../../sections/admin/book-appointment";

const BookAppointment = () => {
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
				<AdminBookAppointment />
				<Toaster position="top-center" />
			</>
		);
	}

	return null;
};

export default BookAppointment;
