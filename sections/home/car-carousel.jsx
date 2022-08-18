import Image from "next/image";

import AudiLogo from "../../public/images/audi-logo.png";
import SkodaLogo from "../../public/images/skoda-logo.png";
import VWLogo from "../../public/images/vw-logo.png";
import SeatLogo from "../../public/images/seat-logo.png";
import Container from "../../components/container";

const CarCarousel = () => (
  <section className="car-carousel">
    <Container className="car-carousel__container">
      <ul className="car-carousel__list">
        <li className="car-carousel__item car-carousel__audi">
          <Image src={AudiLogo} alt="audi logo" />
        </li>
        <li className="car-carousel__item car-carousel__skoda">
          <Image src={SkodaLogo} alt="skoda logo" />
        </li>
        <li className="car-carousel__item car-carousel__vw">
          <Image src={VWLogo} alt="wolksvagen logo" />
        </li>
        <li className="car-carousel__item car-carousel__seat">
          <Image src={SeatLogo} alt="seat logo" />
        </li>
        <li className="car-carousel__item car-carousel__audi">
          <Image src={AudiLogo} alt="audi logo" />
        </li>
        <li className="car-carousel__item car-carousel__skoda">
          <Image src={SkodaLogo} alt="skoda logo" />
        </li>
        <li className="car-carousel__item car-carousel__vw">
          <Image src={VWLogo} alt="wolksvagen logo" />
        </li>
        <li className="car-carousel__item car-carousel__seat">
          <Image src={SeatLogo} alt="seat logo" />
        </li>
        <li className="car-carousel__item car-carousel__audi">
          <Image src={AudiLogo} alt="audi logo" />
        </li>
        <li className="car-carousel__item car-carousel__skoda">
          <Image src={SkodaLogo} alt="skoda logo" />
        </li>
        <li className="car-carousel__item car-carousel__vw">
          <Image src={VWLogo} alt="wolksvagen logo" />
        </li>
        <li className="car-carousel__item car-carousel__seat">
          <Image src={SeatLogo} alt="seat logo" />
        </li>
      </ul>
    </Container>
  </section>
);

export default CarCarousel;
