import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Slider1 from "../public/images/slider-1.png";
import Slider2 from "../public/images/slider-2.png";
import Slider3 from "../public/images/slider-3.png";
import Slider4 from "../public/images/slider-4.png";
import Container from "../components/container";
import Logo from "../components/logo";

const Services = () => {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };
  return (
    <section className="services" id="services">
      <Container>
        <div className="services__header">
          <Logo />
        </div>
        <div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={30}
            breakpoints={breakpoints}
            loop
            pagination={{
              clickable: true,
            }}
            navigation
            modules={[Pagination, Navigation]}
            className="services__slider"
          >
            <h4 className="services__title">Послуги</h4>
            <SwiperSlide>
              <div className="services__image-wrapper">
                <Image src={Slider1} alt="Діагностика" quality={100} placeholder="blur" />
                <span className="services__image-number">00-1</span>
                <p className="services__image-text">Комп&apos;ютерна діагностика</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services__image-wrapper">
                <Image
                  src={Slider2}
                  alt="Ремонт несправностей електричної системи"
                  quality={100}
                  placeholder="blur"
                />
                <span className="services__image-number">00-2</span>
                <p className="services__image-text">Ремонт несправностей електричної системи</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services__image-wrapper">
                <Image
                  src={Slider3}
                  alt="Ремонт електроелементів автомобіля"
                  quality={100}
                  placeholder="blur"
                />
                <span className="services__image-number">00-3</span>
                <p className="services__image-text">Ремонт електроелементів автомобіля</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services__image-wrapper">
                <Image src={Slider4} alt="Виїзд до клієнта" quality={100} placeholder="blur" />
                <span className="services__image-number">00-4</span>
                <p className="services__image-text">Виїзд до клієнта</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Services;
