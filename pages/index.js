import Head from "next/head";
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

export const getServerSideProps = async (context) => ({
	props: { host: context.req.headers.host || null },
});

const Home = ({ host }) => (
	<>
		<Head>
			<title>VAG автоелектрик Тернопіль</title>
			<meta name="robots" content="noindex, nofollow" />
			<link rel="canonical" href={host} />
			<meta
				name="description"
				content="Комп'ютерна діагностика та ремонт Volkswagen, Škoda, Audi, SEAT у Тернополі. Ремонт несправностей електричної сиситеми, ремонт електроелементів автомобіля. Виїзд до клієнта. Бродівська 59"
			/>
			<meta name="copyright" content="Copyright © 2022 VAG автоелектрик Тернопіль" />
			<meta name="author" content="VAG автоелектрик Тернопіль" />
			<meta property="og:type" content="website" />
			<meta name="og:site_name" content="VAG автоелектрик Тернопіль" />
			<meta name="twitter:site" content="VAG автоелектрик Тернопіль" />
			<meta property="og:locale" content="uk_UA" />
			<meta property="og:url" content={host} />
			<meta
				property="og:title"
				content="Автоелектрик Тернопіль. Комп'ютерна діагностика та ремонт автоелектрики VAG групи"
			/>
			<meta
				name="twitter:title"
				content="Автоелектрик Тернопіль. Комп'ютерна діагностика та ремонт автоелектрики VAG групи"
			/>
			<meta
				property="og:description"
				content="Комп'ютерна діагностика та ремонт Volkswagen, Škoda, Audi, SEAT у Тернополі. Ремонт несправностей електричної сиситеми, ремонт електроелементів автомобіля. Виїзд до клієнта. Бродівська 59"
			/>
			<meta
				property="twitter:description"
				content="Комп'ютерна діагностика та ремонт Volkswagen, Škoda, Audi, SEAT у Тернополі. Ремонт несправностей електричної сиситеми, ремонт електроелементів автомобіля. Виїзд до клієнта. Бродівська 59"
			/>
			<meta property="og:image" href={`${host}/images/og_image.jpg`} />
			<meta property="twitter:image" content={`${host}/images/og_image.jpg`} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta
				property="og:image:alt"
				content="Автоелектрик Тернопіль. Комп'ютерна діагностика та ремонт автоелектрики VAG групи"
			/>
			<meta name="twitter:card" content="summary_large_image" />
			<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			<link rel="icon" href="/favicon.ico" type="image/x-icon" />
		</Head>
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
