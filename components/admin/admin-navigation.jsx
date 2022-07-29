import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import HomeIcon from "../../public/icons/home-icon.svg";
import AddIcon from "../../public/icons/add-icon.svg";
import ClientsIcon from "../../public/icons/clients-icon.svg";
import ExitIcon from "../../public/icons/exit-icon.svg";

const AdminNavigation = () => {
  const { asPath } = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <div className="admin-navigation">
      <div className="admin-navigation__mobile">
        <p className="admin-navigation__logo">
          АВТОЕЛЕКТРИК <br /> <span className="admin-navigation__logo_green">VAG GROUP</span>
        </p>
        <button
          type="button"
          onClick={handleDrawer}
          className={cn("admin-navigation__burger-menu", {
            "admin-navigation__burger-menu_is-drawer-open": isDrawerOpen,
          })}
        >
          <span />
        </button>
      </div>
      <sidebar className="admin-navigation__sidebar">
        <div className="admin-navigation__sidebar-wrapper">
          <p className="admin-navigation__logo">
            АВТОЕЛЕКТРИК <br /> <span className="admin-navigation__logo_green">VAG GROUP</span>
          </p>
          <ul>
            <li
              className={cn("admin-navigation__link-item", {
                "admin-navigation__link-item_active": asPath === "/admin",
              })}
            >
              <Link href="/admin" passHref>
                <a className="admin-navigation__link" href="replace">
                  <HomeIcon />
                  Головна
                </a>
              </Link>
            </li>
            <li
              className={cn("admin-navigation__link-item", {
                "admin-navigation__link-item_active": asPath === "/admin",
              })}
            >
              <Link href="/admin" passHref>
                <a className="admin-navigation__link" href="replace">
                  <AddIcon />
                  Записати
                  <span>2</span>
                </a>
              </Link>
            </li>
            <li
              className={cn("admin-navigation__link-item", {
                "admin-navigation__link-item_active": asPath === "/admin",
              })}
            >
              <Link href="/admin" passHref>
                <a className="admin-navigation__link" href="replace">
                  <ClientsIcon />
                  Клієнти
                </a>
              </Link>
            </li>
          </ul>
          <button type="button" className="admin-navigation__exit">
            <ExitIcon />
            Вийти
          </button>
        </div>
      </sidebar>
    </div>
  );
};

export default AdminNavigation;
