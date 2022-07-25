import Link from "next/link";
import Image from "next/image";

import Navigation from "../components/navigation";
import Container from "../components/container";
import NotFoundImage from "../public/images/not-found.png";

const NotFound = () => (
	<>
		<Navigation variant="404" />
		<section className="not-found">
			<Container className="not-found__container">
				<div className="not-found__body">
					<div className="not-found__image-wrapper">
						<Image src={NotFoundImage} alt="page not found" placeholder="blur" />
						<span className="not-found__404">404</span>
					</div>
					<h1 className="not-found__title">
						Cторінку <br /> не знайдено..
					</h1>
				</div>
				<Link href="/" passHref>
					<a className="button not-found__button" href="replace">
						Повернутись на головну
					</a>
				</Link>
			</Container>
		</section>
	</>
);

export default NotFound;
