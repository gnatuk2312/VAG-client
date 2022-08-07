import { useState } from "react";
import Link from "next/link";
import cn from "classnames";

import AdminTitle from "../../../components/admin/admin-title";
import TableItem from "../../../components/admin/clients/table-item";
import { clients, searchClientsDropDownConfig } from "../../../constants/common";
import AddBigIcon from "../../../public/icons/add-big-icon.svg";
import SearchIcon from "../../../public/icons/search-icon.svg";
import SortIcon from "../../../public/icons/sort-icon.svg";

const AdminClients = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDown = () => setIsDropDownOpen((prev) => !prev);
  const [searchFilter, setSearchFilter] = useState("");
  const handleSearchFilter = (filter) => {
    setSearchFilter(filter);
    setIsDropDownOpen(false);
  };
  return (
    <section className="admin-clients">
      <div>
        <div className="admin-clients__header">
          <AdminTitle title="Клієнти" />
          <Link href="/admin/new-client" passHref>
            <a className="admin-button admin-clients__add-new-client" href="replace">
              <AddBigIcon />
              Додати нового клієнта
            </a>
          </Link>
        </div>
        <form className="admin-clients__form">
          <input type="text" className="admin-clients__search" />
          <button type="submit" className="admin-clients__submit">
            <SearchIcon />
          </button>
          <button
            onClick={handleDropDown}
            type="button"
            className={cn("admin-clients__open-search-dropdown", {
              "admin-clients__open-search-dropdown_is-dropdown-open": isDropDownOpen,
            })}
          >
            <div />
          </button>
          <ul
            className={cn("admin-clients__dropdown", {
              "admin-clients__dropdown_is-open": isDropDownOpen,
            })}
          >
            {searchClientsDropDownConfig.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => handleSearchFilter(item)}
                  className={cn("admin-clients__dropdown-item", {
                    "admin-clients__dropdown-item_active": searchFilter === item,
                  })}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="admin-clients__sort-by-date">
            <SortIcon />
          </button>
        </form>
        <div className="clients-table">
          <div className="clients-table__header">
            <p>Клієнт</p>
            <p>Номер телефону</p>
            <p>Марка авто</p>
            <p>Номерний знак</p>
            <p>Email</p>
            <p>⠀</p>
          </div>
          <div className="clients-table__wrapper">
            {clients.map((client) => (
              <TableItem key={client._id} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminClients;
