import Head from "next/head";
import { useContext } from "react";

import { GlobalContext } from "../../context/state";
import AdminNavigation from "../../components/admin/admin-navigation";
import AdminHome from "../../sections/admin/home";
import AdminLogin from "../../sections/admin/login";

const Home = () => {
	const { adminLoggedIn } = useContext(GlobalContext);

	if (adminLoggedIn) {
		return (
			<>
				<Head>
					<title>Сторінка Адміністратора</title>
					<meta name="robots" content="noindex, nofollow" />
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				</Head>
				<AdminNavigation />
				<AdminHome />
			</>
		);
	}

	return (
		<>
			<Head>
				<title>Авторизація</title>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<AdminLogin />
		</>
	);
};

export default Home;
