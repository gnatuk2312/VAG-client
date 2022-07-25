import { useState } from "react";
import cn from "classnames";
import { Link } from "react-scroll";

import Container from "./container";
import Logo from "./logo";
import Drawer from "./drawer";
import useVerticalScrollProps from "../hooks/useVerticalScrollProps";

const Navigation = () => {
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
          <Link
            onClick={handleDrawerClose}
            href="#header"
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
          </Link>
          <ul className="navigation__links">
            <li className="navigation__item">
              <Link href="#about-company" to="about-company" smooth duration={500}>
                Про нас
              </Link>
            </li>
            <li className="navigation__item">
              <Link href="#services" to="services" smooth duration={500}>
                Послуги
              </Link>
            </li>
            <li className="navigation__item">
              <Link href="#book-appointment" to="book-appointment" smooth duration={500}>
                Записатись
              </Link>
            </li>
            <li className="navigation__item">
              <Link href="#contacts" to="contacts" smooth duration={500}>
                Контакти
              </Link>
            </li>
          </ul>
          <button type="button" onClick={handleDrawerState} className="navigation__burger-menu">
            <span />
          </button>
        </Container>
      </nav>
      <Drawer isOpen={drawerIsOpen} onClose={handleDrawerClose} />
    </>
  );
};

export default Navigation;
