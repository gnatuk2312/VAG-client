import { useState } from "react";
import cn from "classnames";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

import Container from "../container";
import Logo from "./logo";
import Drawer from "./drawer";
import useVerticalScrollProps from "../../hooks/useVerticalScrollProps";

const Navigation = (props) => {
  const { variant } = props;
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerState = () => setDrawerIsOpen((prev) => !prev);

  const handleDrawerClose = () => setDrawerIsOpen(false);

  const { isScrollUp, isScrolled } = useVerticalScrollProps();

  return (
    <>
      <nav
        className={cn(
          "navigation",
          { "navigation_is-drawer-open": drawerIsOpen },
          { "navigation_is-visible": isScrollUp || !isScrolled },
        )}
      >
        <Container className="navigation__container">
          {variant === "home" && (
            <>
              <ScrollLink
                onClick={handleDrawerClose}
                to="header"
                smooth
                duration={500}
                className="navigation__logo"
              >
                <Logo />
                <p>
                  автоелектрик <br />
                  <span>vag group</span>
                </p>
              </ScrollLink>
              <ul className="navigation__links">
                <li className="navigation__item">
                  <ScrollLink to="about-company" href="#about-company" smooth duration={500}>
                    Про нас
                  </ScrollLink>
                </li>
                <li className="navigation__item">
                  <ScrollLink to="services" href="#services" smooth duration={500}>
                    Послуги
                  </ScrollLink>
                </li>
                <li className="navigation__item">
                  <ScrollLink to="book-appointment" href="#book-appointment" smooth duration={500}>
                    Записатись
                  </ScrollLink>
                </li>
                <li className="navigation__item">
                  <ScrollLink to="contacts" href="#contacts" smooth duration={500}>
                    Контакти
                  </ScrollLink>
                </li>
              </ul>
            </>
          )}
          {variant === "404" && (
            <>
              <Link href="/" passHref>
                <a href="replace" className="navigation__logo navigation__logo_not-found">
                  <p>
                    автоелектрик <br />
                    <span>vag group</span>
                  </p>
                </a>
              </Link>
              <ul className="navigation__links">
                <li className="navigation__item">
                  <Link href="/" passHref>
                    <a href="replace">Про нас</a>
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link href="/" passHref>
                    <a href="replace">Послуги</a>
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link href="/" passHref>
                    <a href="replace">Записатись</a>
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link href="/" passHref>
                    <a href="replace">Контакти</a>
                  </Link>
                </li>
              </ul>
            </>
          )}
          <button type="button" onClick={handleDrawerState} className="navigation__burger-menu">
            <span />
          </button>
        </Container>
      </nav>
      <Drawer isOpen={drawerIsOpen} variant={variant} onClose={handleDrawerClose} />
    </>
  );
};

export default Navigation;
