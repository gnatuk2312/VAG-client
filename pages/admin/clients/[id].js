import { Toaster } from "react-hot-toast";

import AdminNavigation from "../../../components/admin/admin-navigation";
import AdminClient from "../../../sections/admin/clients/client";

const Client = () => (
	<>
		<AdminNavigation />
		<AdminClient />
		<Toaster position="top-center" toastOptions={{ duration: 4000 }} />
	</>
);

export default Client;
