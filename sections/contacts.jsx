import Container from "../components/container";
import Logo from "../components/logo";
import Button from "../components/button";
import TomtomMap from "../components/tomtom-map";
import FacebookIcon from "../public/icons/facebook-icon.svg";
import InstagramIcon from "../public/icons/instagram-icon.svg";
import YouTubeIcon from "../public/icons/youtube-icon.svg";
import TikTokIcon from "../public/icons/tiktok-icon.svg";

const Contacts = () => (
  <section className="contacts" id="contacts">
    <Container>
      <div className="contacts__header">
        <Logo />
        <h6 className="contacts__title">Контакти</h6>
      </div>
      <div className="contacts__body">
        <div className="contacts__left-side-wrapper">
          <div className="contacts__action">
            <p className="contacts__text">
              Маючи 15 років досвіду ремонту автомобілів, обіцяємо, що будемо піклуватись про твоє
              авто, як своє власне.
            </p>
            <Button className="contacts__action-button">Записатись на діагностику</Button>
          </div>
          <div className="contacts__main">
            <ul>
              <li className="contacts__contact-list-item">
                <span>L:</span>
                <address>
                  Тернопіль, <br />
                  вул. Бродівська 59
                </address>
              </li>
              <li className="contacts__contact-list-item">
                <span>W:</span>
                <p>
                  ПН-ПТ 9:00-17:00 <br />
                  СБ-НД Вихідний
                </p>
              </li>
              <li className="contacts__contact-list-item">
                <span>C:</span>
                <a href="tel:+380679992655">+38 067 999 26 55</a>
                <a href="mailto:vagautotern@gmail.com">vagautotern@gmail.com</a>
              </li>
            </ul>
            <ul className="contacts__social-list">
              <li className="contacts__social-list-item">
                <a
                  href="https://www.instagram.com/slavek_grabovskiy"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li className="contacts__social-list-item">
                <a href="https://uk-ua.facebook.com" target="_blank" rel="noreferrer">
                  <FacebookIcon />
                </a>
              </li>
              <li className="contacts__social-list-item">
                <a
                  href="https://www.youtube.com/channel/UCfO-su5F0y7n1ew39LgmoGg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <YouTubeIcon />
                </a>
              </li>
              <li className="contacts__social-list-item">
                <a href="https://vm.tiktok.com/ZMNPKwj98" target="_blank" rel="noreferrer">
                  <TikTokIcon />
                </a>
              </li>
            </ul>
            <Button className="contacts__main-button">Записатись на діагностику</Button>
            <div className="contacts__main-green-logo" />
          </div>
        </div>
        <TomtomMap className="contacts__google-maps-container" />
      </div>
    </Container>
  </section>
);

export default Contacts;
