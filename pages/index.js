import { Toaster } from "react-hot-toast";

import Navigation from "../components/navigation";
import Header from "../sections/header";
import AboutCompany from "../sections/about-company";
import Services from "../sections/services";
import CarCarousel from "../sections/car-carousel";
import BookAppointment from "../sections/book-appointment";
import TextCarousel from "../sections/text-carousel";
import Contacts from "../sections/contacts";
import Footer from "../sections/footer";

const Home = () => (
	<>
		<Navigation />
		<Header />
		<AboutCompany />
		<Services />
		<CarCarousel />
		<BookAppointment />
		<TextCarousel />
		<Contacts />
		<Toaster position="bottom-center" toastOptions={{ duration: 5000, className: "toaster" }} />
		<Footer />
	</>
);

export default Home;
