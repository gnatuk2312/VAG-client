import { Toaster } from "react-hot-toast";

import AdminNavigation from "../../../components/admin/admin-navigation";
import AdminNewClient from "../../../sections/admin/clients/new-client";

const NewClient = () => (
	<>
		<AdminNavigation />
		<AdminNewClient />
		<Toaster position="top-center" />
	</>
);

export default NewClient;
