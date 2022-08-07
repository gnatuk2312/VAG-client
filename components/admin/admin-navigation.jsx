import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import AdminDrawer from "./admin-drawer";
import useVerticalScrollProps from "../../hooks/useVerticalScrollProps";
import HomeIcon from "../../public/icons/home-icon.svg";
import AddIcon from "../../public/icons/add-icon.svg";
import ClientsIcon from "../../public/icons/clients-icon.svg";
import ExitIcon from "../../public/icons/exit-icon.svg";

const AdminNavigation = () => {
  const { asPath } = useRouter();
  const { isScrollUp, isScrolled } = useVerticalScrollProps();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <>
      <nav className="admin-navigation">
        <div
          className={cn("admin-navigation__mobile", {
            "admin-navigation__mobile_is-visible": isScrollUp || !isScrolled,
          })}
        >
          <Link href="/admin" passHref>
            <a onClick={handleDrawerClose} className="admin-navigation__logo" href="replace">
              АВТОЕЛЕКТРИК <br /> <span className="admin-navigation__logo_green">VAG GROUP</span>
            </a>
          </Link>
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
        <div className="admin-navigation__sidebar">
          <div className="admin-navigation__sidebar-wrapper">
            <Link href="/admin" passHref>
              <a className="admin-navigation__logo" href="replace">
                АВТОЕЛЕКТРИК <br /> <span className="admin-navigation__logo_green">VAG GROUP</span>
              </a>
            </Link>
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
                  "admin-navigation__link-item_active": asPath === "/admin/book-appointment",
                })}
              >
                <Link href="/admin/book-appointment" passHref>
                  <a className="admin-navigation__link" href="replace">
                    <AddIcon />
                    Записати
                    <span>2</span>
                  </a>
                </Link>
              </li>
              <li
                className={cn("admin-navigation__link-item", {
                  "admin-navigation__link-item_active": asPath === "/admin/clients",
                })}
              >
                <Link href="/admin/clients" passHref>
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
        </div>
      </nav>
      <AdminDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </>
  );
};

export default AdminNavigation;
