import { useContext, useEffect } from "react";
import Head from "next/head";
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
				<Head>
					<title>Онлайн Запис</title>
					<meta name="robots" content="noindex, nofollow" />
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				</Head>
				<AdminNavigation />
				<AdminBookAppointment />
				<Toaster position="top-center" />
			</>
		);
	}

	return null;
};

export default BookAppointment;
