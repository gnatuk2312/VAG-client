import { useContext, Suspense } from "react";
import dynamic from "next/dynamic";

import { GlobalContext } from "../../context/state";

const DynamicNavigation = dynamic(() => import("../../components/admin/admin-navigation"), {
	suspense: true,
});
const DynamicAdminHome = dynamic(() => import("../../sections/admin/home"), {
	suspense: true,
});
const DynamicAdminLogin = dynamic(() => import("../../sections/admin/login"), {
	suspense: true,
});

const Home = () => {
	const { adminLoggedIn } = useContext(GlobalContext);

	if (adminLoggedIn) {
		return (
			<Suspense fallback="Loading...">
				<DynamicNavigation />
				<DynamicAdminHome />
			</Suspense>
		);
	}

	return (
		<Suspense fallback="Loading...">
			<DynamicAdminLogin />
		</Suspense>
	);
};

export default Home;
