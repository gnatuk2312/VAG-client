import { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import toast from "react-hot-toast";

import AdminTitle from "../../../components/admin/admin-title";
import TableItem from "../../../components/admin/clients/table-item";
import Loading from "../../../components/admin/loading";
import { searchClientsDropDownConfig } from "../../../constants/common";
import AddBigIcon from "../../../public/icons/add-big-icon.svg";
import SearchIcon from "../../../public/icons/search-icon.svg";
import { getAllClients } from "../../../api/clients";

const AdminClients = () => {
  const [clients, setClients] = useState([]);

  const [pending, setPending] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [allDataIsFetched, setAllDataIsFetched] = useState(false);

  const LIMIT = 30;
  const [page, setPage] = useState(1);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [searchField, setSearchField] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  const handleDropDown = () => setIsDropDownOpen((prev) => !prev);
  const handleSearchField = (filter) => {
    setSearchField(filter);
    setIsDropDownOpen(false);
  };

  const handleInfinityScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;

    if (scrollHeight - (scrollTop + clientHeight) < 100 && allDataIsFetched === false)
      setFetching(true);
  };

  useEffect(() => {
    if (fetching) {
      setPending(true);
      getAllClients(LIMIT, page, searchField, searchValue)
        .then((resp) => {
          if (resp.status === 200) {
            if (page === 1) {
              setClients(resp.data.clients);
            } else {
              setClients([...clients, ...resp.data.clients]);
            }
            if (resp.data.clients.length === 0) {
              setAllDataIsFetched(true);
            }
            setPage(page + 1);
            return;
          }
          return toast.error(`Помилка при завантаженні клієнтів. ${resp?.message}`);
        })
        .catch((err) => {
          toast.error(`Щось не так з вашим запитом. Деталі: ${err.message}`);
        })
        .finally(() => {
          setFetching(false);
          setPending(false);
        });
    }
  }, [fetching]);

  const handleSearchClients = (event) => {
    event.preventDefault();
    setPage(1);
    setAllDataIsFetched(false);
    setFetching(true);
  };

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
    setAllDataIsFetched(false);
    handleSearchClients(event);
  };

  return (
    <section className="admin-clients">
      <div>
        <Loading isVisible={pending} />
        <div className="admin-clients__header">
          <AdminTitle title="Клієнти" />
          <Link href="/admin/clients/new-client" passHref>
            <a className="admin-button admin-clients__add-new-client" href="replace">
              <AddBigIcon />
              Додати нового клієнта
            </a>
          </Link>
        </div>
        <form className="admin-clients__form">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchValue}
            className="admin-clients__search"
          />
          <button type="submit" onClick={handleSearchClients} className="admin-clients__submit">
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
              <li key={item.field}>
                <button
                  type="button"
                  onClick={() => handleSearchField(item.field)}
                  className={cn("admin-clients__dropdown-item", {
                    "admin-clients__dropdown-item_active": searchField === item.field,
                  })}
                >
                  {item.displayName}
                </button>
              </li>
            ))}
          </ul>
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
          <div className="clients-table__wrapper" onScroll={handleInfinityScroll}>
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
