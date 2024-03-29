import { useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import Router from "next/router";
import toast from "react-hot-toast";

import AdminTitle from "../../../components/admin/admin-title";
import AdminClientVisitModal from "../../../components/admin/clients/client-visit-modal";
import Loading from "../../../components/admin/loading";
import { formatPhoneNumber } from "../../../helpers/format-phone-number";
import getScrollBarWidth from "../../../helpers/get-scrollbar-width";
import removeEmptyKeysInObject from "../../../helpers/remove-empty-keys-in-object";
import useInfinityScroll from "../../../hooks/useInfinityScroll";
import AddBigIcon from "../../../public/icons/add-big-icon.svg";
import AddBigIconLight from "../../../public/icons/add-big-icon-light.svg";
import EditIcon from "../../../public/icons/edit-icon.svg";
import DoneIconGreen from "../../../public/icons/done-icon-green.svg";
import CancelIcon from "../../../public/icons/close-icon.svg";
import {
  deleteClientByID,
  getClientByID,
  updateClientByID,
  getAllClientVisits,
  deleteAllClientVisits,
} from "../../../api/clients";

const AdminClient = (props) => {
  const { clientID } = props;

  const [initialClient, setInitialClient] = useState(null);

  const [client, setClient] = useState(null);

  const [clientDisableEditing, setClientDisableEditing] = useState(true);
  const [isVisitModalOpen, setVisitModalOpen] = useState(false);
  const [visitModalOptions, setVisitModalOptions] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [pending, setPending] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [allDataIsFetched, setAllDataIsFetched] = useState(false);

  const [visits, setVisits] = useState([]);
  const [visitsPage, setVisitsPage] = useState(1);
  const VISITS_LIMIT = 30;

  const handleClientInputs = (event) => {
    if (event.target.name === "licensePlate") {
      setClient({ ...client, [event.target.name]: event.target.value.toUpperCase() });
    } else {
      setClient({ ...client, [event.target.name]: event.target.value });
    }
  };
  const handlePhoneInput = (event) => {
    setClient({ ...client, phone: formatPhoneNumber(event.target.value) });
  };
  const handleFavorite = () => {
    setClient({ ...client, favorite: !client.favorite });
  };
  const handleAllowClientEditing = () => {
    setClientDisableEditing(false);
    toast.success("Ви перейшли в режим РЕДАГУВАННЯ");
  };
  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const requestBody = { ...client };
    delete requestBody.createdAt;
    delete requestBody.updatedAt;
    delete requestBody._id;
    const requestBodyNoEmptyValues = removeEmptyKeysInObject(requestBody);
    setPending(true);
    updateClientByID(clientID, requestBodyNoEmptyValues)
      .then((resp) => {
        if (resp.status === 200) {
          setInitialClient(resp.data.client);
          setClient(resp.data.client);
          setPending(false);
          toast.success("Успішно редаговано");
          return;
        }
        setPending(false);
        return toast.error(`Помилка при редагуванні клієнта. ${resp?.message}`);
      })
      .catch((err) => {
        setPending(false);
        toast.error(`Щось не так з вашим запитом. Деталі: ${err.message}`);
      });
    setClientDisableEditing(true);
  };

  const handleSubmitDelete = () => {
    const clientId = clientID;
    setPending(true);
    deleteClientByID(clientId)
      .then((resp) => {
        if (resp.status === 200) {
          deleteAllClientVisits(clientId)
            .then(() => {
              toast.success("Клієнта успішно видалено");
              setTimeout(() => Router.push("/admin/clients"), 300);
            })
            .catch((err) => toast.error(`Помилка при видаленні клієнта. ${err.message}`));
        } else {
          return toast.error(`Помилка при видаленні клієнта. ${resp?.message}`);
        }
      })
      .catch((err) => {
        toast.error(`Щось не так з вашим запитом. Деталі: ${err.message}`);
      })
      .finally(() => setPending(false));
  };

  const handleCancelUpdate = () => {
    setClient(initialClient);
    setClientDisableEditing(true);
    toast.error("Відміна редагування");
  };

  const handleCloseVisitModal = () => setVisitModalOpen(false);

  const handleEditVisit = (id) => {
    setVisitModalOptions({ variant: "edit", clientId: null, id });
    setVisitModalOpen(true);
  };
  const handleAddNewVisit = () => {
    setVisitModalOptions({ variant: "add", clientId: client._id, id: null });
    setVisitModalOpen(true);
  };
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    setScrollbarWidth(getScrollBarWidth());

    setPending(true);
    getClientByID(clientID)
      .then((resp) => {
        if (resp.status === 200) {
          setInitialClient(resp.data.client);
          setClient(resp.data.client);
          return;
        }
        return toast.error(`Помилка у завантаженні даних про клієнта. ${resp?.message}`);
      })
      .catch((err) => {
        toast.error(`Щось не так з вашим запитом. Деталі: ${err.message}`);
      })
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    if (isVisitModalOpen === false) {
      setVisitsPage(1);
      setFetching(true);
    }
  }, [isVisitModalOpen]);

  useEffect(() => {
    if (fetching) {
      setPending(true);
      getAllClientVisits(clientID, VISITS_LIMIT, visitsPage)
        .then((resp) => {
          if (resp.status === 200) {
            if (visitsPage === 1) {
              setVisits(resp.data.visits);
            } else {
              setVisits((prev) => [...prev, ...resp.data.visits]);
            }
            if (resp.data.visits.length === 0) {
              setAllDataIsFetched(true);
            }
            setVisitsPage((prev) => prev + 1);
            return;
          }
          return toast.error(`Помилка при завантаженні візитів. ${resp?.message}`);
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

  const handleBookAppointmentClick = () => {
    localStorage.setItem("clientName", client.name);
    localStorage.setItem("clientPhone", client.phone);
  };

  return (
    <>
      <section className="admin-client">
        <div className="admin-client__container">
          <div
            className={cn("admin-client__delete-modal modal", {
              "modal_is-open": isDeleteModalOpen,
            })}
          >
            <div className="modal__body">
              <p className="modal__title">Ви впевнені, що хочете видалити клієнта?</p>
              <div className="modal__buttons">
                <button
                  onClick={handleSubmitDelete}
                  type="button"
                  className="modal__button modal__button_submit"
                >
                  Видалити
                </button>
                <button
                  onClick={handleCloseDeleteModal}
                  type="button"
                  className="modal__button modal__button_cancel"
                >
                  Скасувати
                </button>
              </div>
            </div>
          </div>
          <Loading isVisible={pending} />
          <div className="admin-client__header">
            <AdminTitle title="Клієнт" />
            <div className="admin-client__header-buttons">
              <Link href="/admin/book-appointment" passHref>
                <a
                  onClick={handleBookAppointmentClick}
                  className="admin-button admin-client__book-appointment"
                  href="replace"
                >
                  <AddBigIconLight />
                  Записати на прийом
                </a>
              </Link>
              <button
                onClick={handleAddNewVisit}
                type="button"
                className="admin-button admin-client__add-new-visit"
              >
                <AddBigIcon />
                Додати новий запис
              </button>
              <button
                onClick={handleOpenDeleteModal}
                type="button"
                className="admin-button admin-client__delete-client"
              >
                Видалити клієнта
              </button>
            </div>
          </div>
          {client && (
            <form className="admin-client__form">
              <div className="admin-client__client-name-wrapper">
                <span className="admin-client__avatar">{client?.name?.slice(0, 1)}</span>
                <input
                  value={client.name}
                  onChange={handleClientInputs}
                  disabled={clientDisableEditing}
                  name="name"
                  type="text"
                  className="admin-client__input admin-client__input_name"
                />
              </div>
              <input
                value={client.phone}
                onChange={handlePhoneInput}
                disabled={clientDisableEditing}
                name="phone"
                type="text"
                className="admin-client__input admin-client__input_phone"
              />
              <div className="admin-client__car-wrapper">
                <input
                  value={client.carBrand}
                  onChange={handleClientInputs}
                  disabled={clientDisableEditing}
                  name="carBrand"
                  type="text"
                  className="admin-client__input admin-client__input_carBrand"
                />
                <input
                  value={client.carModel}
                  onChange={handleClientInputs}
                  disabled={clientDisableEditing}
                  name="carModel"
                  type="text"
                  className="admin-client__input admin-client__input_carModel"
                />
              </div>
              <input
                value={client.licensePlate}
                onChange={handleClientInputs}
                disabled={clientDisableEditing}
                name="licensePlate"
                type="text"
                className="admin-client__input admin-client__input_license-plate"
              />
              <input
                value={client.email}
                onChange={handleClientInputs}
                disabled={clientDisableEditing}
                name="email"
                type="text"
                className="admin-client__input admin-client__input_email"
              />
              <div className="admin-client__actions">
                {clientDisableEditing && (
                  <div className="admin-client__edit-client-wrapper">
                    <button
                      onClick={handleAllowClientEditing}
                      type="button"
                      className="admin-client__edit-client"
                    >
                      <EditIcon />
                    </button>
                  </div>
                )}
                {!clientDisableEditing && (
                  <div className="admin-client__submit-buttons">
                    <button
                      onClick={handleSubmitUpdate}
                      type="submit"
                      className="admin-client__submit"
                    >
                      <DoneIconGreen />
                    </button>
                    <button
                      onClick={handleCancelUpdate}
                      type="button"
                      className="admin-client__cancel"
                    >
                      <CancelIcon />
                    </button>
                  </div>
                )}
                <label
                  htmlFor={client._id}
                  className={cn("admin-client__favorite", {
                    "admin-client__favorite_is-disabled": clientDisableEditing,
                  })}
                >
                  <input
                    checked={client.favorite}
                    onChange={handleFavorite}
                    disabled={clientDisableEditing}
                    type="checkbox"
                    id={client._id}
                  />
                  <span />
                </label>
              </div>
            </form>
          )}
        </div>
        {client && (
          <div className="admin-client__visits client-visits">
            <div className="client-visits__header" style={{ marginRight: `${scrollbarWidth}px` }}>
              <p className="client-visits__header-label client-visits__header-label_date">Дата</p>
              <p className="client-visits__header-label client-visits__header-label_type">
                Тип роботи
              </p>
              <p className="client-visits__header-label client-visits__header-label_description">
                Опис
              </p>
              <p className="client-visits__header-label client-visits__header-label_price">Ціна</p>
              <p className="client-visits__header-label client-visits__header-label_status">
                Статус
              </p>
            </div>
            <div
              className="client-visits__container"
              onScroll={(event) => useInfinityScroll(event, allDataIsFetched, setFetching)}
            >
              {!!visits.length &&
                visits.map((visit) => {
                  const { _id, date, type, description, price, status } = visit;

                  return (
                    <div key={_id} className="client-visits__table-item">
                      <p className="client-visits__text client-visits__text_date">{date}</p>
                      <p className="client-visits__text client-visits__text_type">{type}</p>
                      <p className="client-visits__text client-visits__text_description">
                        {description}
                      </p>
                      <p className="client-visits__text client-visits__text_price">{price} ₴</p>
                      <p className="client-visits__text client-visits__text_status">{status}</p>
                      <button
                        onClick={() => handleEditVisit(_id)}
                        type="button"
                        className="client-visits__edit-visit"
                      >
                        <EditIcon />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </section>
      <AdminClientVisitModal
        options={visitModalOptions}
        isOpen={isVisitModalOpen}
        onCloseVisitModal={handleCloseVisitModal}
      />
    </>
  );
};

export default AdminClient;
