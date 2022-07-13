import Navigation from "../components/navigation";
import Header from "../sections/header";
import AboutCompany from "../sections/about-company";

const Home = () => (
	<>
		<Navigation />
		<Header />
		<AboutCompany />
		<div className="normal">Славчик - Маркетолог</div>
		<div className="light">Проект = Автоелектрик</div>
		<div className="ultra">Гнатик - Програміст</div>
	</>
);

export default Home;
