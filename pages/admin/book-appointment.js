import { Toaster } from "react-hot-toast";

import AdminNavigation from "../../components/admin/admin-navigation";
import AdminBookAppointment from "../../sections/admin/book-appointment";

const BookAppointment = () => (
	<>
		<AdminNavigation />
		<AdminBookAppointment />
		<Toaster position="top-center" />
	</>
);

export default BookAppointment;
