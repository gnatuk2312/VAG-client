import { useContext, useState } from "react";
import Cookies from "js-cookie";
import cn from "classnames";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

import { GlobalContext } from "../../context/state";
import useVerticalScrollProps from "../../hooks/useVerticalScrollProps";
import AdminDrawer from "./admin-drawer";
import HomeIcon from "../../public/icons/home-icon.svg";
import AddIcon from "../../public/icons/add-icon.svg";
import ClientsIcon from "../../public/icons/clients-icon.svg";
import ExitIcon from "../../public/icons/exit-icon.svg";
import { logoutAdmin } from "../../api/admin";

const AdminNavigation = () => {
  const { asPath } = useRouter();
  const { isScrollUp, isScrolled } = useVerticalScrollProps();
  const { setAdminLoggedOut } = useContext(GlobalContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  const handleAdminLogOut = () => {
    logoutAdmin()
      .then((resp) => {
        if (resp.status === 204) {
          toast.success("Ви успішно вийшли");
        }
      })
      .catch((err) => {
        toast.error(`Сталась помилка ${err?.message}`);
      })
      .finally(() => {
        setAdminLoggedOut();
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Router.push("/admin");
      });
  };

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
            <button type="button" onClick={handleAdminLogOut} className="admin-navigation__exit">
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
