import { Toaster } from "react-hot-toast";

import Navigation from "../components/home/navigation";
import Header from "../sections/home/header";
import AboutCompany from "../sections/home/about-company";
import Services from "../sections/home/services";
import CarCarousel from "../sections/home/car-carousel";
import BookAppointment from "../sections/home/book-appointment";
import TextCarousel from "../sections/home/text-carousel";
import Contacts from "../sections/home/contacts";
import Footer from "../sections/home/footer";

const Home = () => (
	<>
		<Navigation variant="home" />
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
