import Navigation from "../components/navigation";
import Header from "../sections/header";
import AboutCompany from "../sections/about-company";
import Services from "../sections/services";
import CarCarousel from "../sections/car-carousel";

const Home = () => (
	<>
		<Navigation />
		<Header />
		<AboutCompany />
		<Services />
		<CarCarousel />
		<div className="normal">Славчик - Маркетолог</div>
		<div className="light">Проект = Автоелектрик</div>
		<div className="ultra">Гнатик - Програміст</div>
	</>
);

export default Home;
