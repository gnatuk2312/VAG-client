import cn from "classnames";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

import Container from "../container";

const Drawer = (props) => {
  const { isOpen, variant, onClose } = props;

  return (
    <div className={cn("drawer", { "drawer_is-open": isOpen })}>
      <Container className="drawer__container">
        {variant === "home" && (
          <ul className="drawer__links">
            <li className="drawer__link-item">
              <ScrollLink onClick={onClose} to="about-company" smooth duration={500}>
                Про нас
              </ScrollLink>
            </li>
            <li className="drawer__link-item">
              <ScrollLink onClick={onClose} to="services" smooth duration={500}>
                Послуги
              </ScrollLink>
            </li>
            <li className="drawer__link-item">
              <ScrollLink onClick={onClose} to="book-appointment" smooth duration={500}>
                Записатись
              </ScrollLink>
            </li>
            <li className="drawer__link-item">
              <ScrollLink onClick={onClose} to="contacts" smooth duration={500}>
                Контакти
              </ScrollLink>
            </li>
          </ul>
        )}
        {variant === "404" && (
          <ul className="drawer__links">
            <li className="drawer__link-item">
              <Link href="/" passHref>
                <a href="replace">Про нас</a>
              </Link>
            </li>
            <li className="drawer__link-item">
              <Link href="/" passHref>
                <a href="replace">Послуги</a>
              </Link>
            </li>
            <li className="drawer__link-item">
              <Link href="/" passHref>
                <a href="replace">Записатись</a>
              </Link>
            </li>
            <li className="drawer__link-item">
              <Link href="/" passHref>
                <a href="replace">Контакти</a>
              </Link>
            </li>
          </ul>
        )}
        <ul className="drawer__main-info">
          <li className="drawer__main-info-item">
            <span>S:</span>
            <ul>
              <li className="drawer__social-item">
                <a
                  href="https://www.instagram.com/slavek_grabovskiy"
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                >
                  Instagram
                </a>
              </li>
              <li className="drawer__social-item">
                <a
                  href="https://uk-ua.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                >
                  Facebook
                </a>
              </li>
              <li className="drawer__social-item">
                <a
                  href="https://www.youtube.com/channel/UCfO-su5F0y7n1ew39LgmoGg"
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                >
                  YouTube
                </a>
              </li>
              <li className="drawer__social-item">
                <a
                  href="https://vm.tiktok.com/ZMNPKwj98"
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                >
                  TikTok
                </a>
              </li>
            </ul>
          </li>
          <li className="drawer__main-info-item">
            <span>L:</span>
            <address>
              Тернопіль, <br />
              вул. Бродівська 59
            </address>
          </li>
          <li className="drawer__main-info-item">
            <span>C:</span>
            <ul>
              <li className="drawer__contacts-item">
                <a href="tel:+380679992655">+38 067 999 26 55</a>
              </li>
              <li className="drawer__contacts-item">
                <a href="mailto:vagautotern@gmail.com">vagautotern@gmail.com</a>
              </li>
            </ul>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Drawer;
