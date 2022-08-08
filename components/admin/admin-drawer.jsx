import cn from "classnames";
import Link from "next/link";

import HomeIcon from "../../public/icons/home-icon.svg";
import AddIcon from "../../public/icons/add-icon.svg";
import ClientsIcon from "../../public/icons/clients-icon.svg";
import ExitIcon from "../../public/icons/exit-icon.svg";

const AdminDrawer = (props) => {
  const { isOpen, onClose } = props;

  return (
    <section className={cn("admin-drawer", { "admin-drawer_is-open": isOpen })}>
      <div className="admin-drawer__container">
        <ul>
          <li className="admin-drawer__link-item">
            <Link href="/admin" passHref>
              <a onClick={onClose} className="admin-drawer__link" href="replace">
                <HomeIcon />
                Головна
              </a>
            </Link>
          </li>
          <li className="admin-drawer__link-item">
            <Link href="/admin/book-appointment" passHref>
              <a onClick={onClose} className="admin-drawer__link" href="replace">
                <AddIcon />
                Записати
              </a>
            </Link>
          </li>
          <li className="admin-drawer__link-item">
            <Link href="/admin/clients" passHref>
              <a onClick={onClose} className="admin-drawer__link" href="replace">
                <ClientsIcon />
                Клієнти
              </a>
            </Link>
          </li>
        </ul>
        <button type="button" className="admin-drawer__exit">
          <ExitIcon />
          Вийти
        </button>
      </div>
    </section>
  );
};

export default AdminDrawer;
