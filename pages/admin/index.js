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
				<AdminNavigation />
				<AdminHome />
			</>
		);
	}

	return <AdminLogin />;
};

export default Home;
