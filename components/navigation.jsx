import { useState } from "react";
import cn from "classnames";
import Link from "next/link";

import Container from "./container";
import Logo from "./logo";
import useVerticalScrollProps from "../hooks/useVerticalScrollProps";

const Navigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerState = () => setDrawerIsOpen((prev) => !prev);

  const { isScrollUp, isScrolled } = useVerticalScrollProps();

  return (
    <nav
      className={cn(
        "navigation",
        { "navigation_is-drawer-open": drawerIsOpen },
        { "navigation_is-visible": isScrollUp || !isScrolled },
      )}
    >
      <Container className="navigation__container">
        <div className="navigation__logo">
          <Logo />
          <p>
            автоелектрик <br />
            <span>vag group</span>
          </p>
        </div>
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
        <button type="button" onClick={handleDrawerState} className="navigation__burger-menu">
          <span />
        </button>
      </Container>
    </nav>
  );
};

export default Navigation;
