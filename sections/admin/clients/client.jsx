import { useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import toast from "react-hot-toast";

import AdminTitle from "../../../components/admin/admin-title";
import AdminClientVisitModal from "../../../components/admin/clients/client-visit-modal";
import Loading from "../../../components/admin/loading";
import { formatPhoneNumber } from "../../../helpers/format-phone-number";
import getScrollBarWidth from "../../../helpers/get-scrollbar-width";
import AddBigIcon from "../../../public/icons/add-big-icon.svg";
import AddBigIconLight from "../../../public/icons/add-big-icon-light.svg";
import EditIcon from "../../../public/icons/edit-icon.svg";
import DoneIconGreen from "../../../public/icons/done-icon-green.svg";
import CancelIcon from "../../../public/icons/close-icon.svg";
import { getClientByID, updateClientByID } from "../../../api/clients";
import removeEmptyKeysInObject from "../../../helpers/remove-empty-keys-in-object";

const AdminClient = (props) => {
  const { clientID } = props;

  const [initialClient, setInitialClient] = useState(null);

  const [client, setClient] = useState(null);

  const [clientDisableEditing, setClientDisableEditing] = useState(true);
  const [isVisitModalOpen, setVisitModalOpen] = useState(false);
  const [visitModalOptions, setVisitModalOptions] = useState({});

  const [pending, setPending] = useState(false);

  const handleClientInputs = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
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
  const handleSubmit = (event) => {
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

  const handleCancel = () => {
    setClient(initialClient);
    setClientDisableEditing(true);
    toast.error("Відміна редагування");
  };

  const handleCloseVisitModal = () => setVisitModalOpen(false);

  const handleEditVisit = () => {
    setVisitModalOptions({ variant: "edit", clientId: client._id, visit: {} });
    setVisitModalOpen(true);
  };
  const handleAddNewVisit = () => {
    setVisitModalOptions({ variant: "add", clientId: client._id, visit: null });
    setVisitModalOpen(true);
  };

  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    setScrollbarWidth(getScrollBarWidth());

    setPending(true);
    getClientByID(clientID)
      .then((resp) => {
        if (resp.status === 200) {
          setInitialClient(resp.data.client);
          setClient(resp.data.client);
          setPending(false);
          return;
        }
        setPending(false);
        return toast.error(`Помилка у завантаженні даних про клієнта. ${resp?.message}`);
      })
      .catch((err) => {
        setPending(false);
        toast.error(`Щось не так з вашим запитом. Деталі: ${err.message}`);
      });
  }, []);

  return (
    <>
      <section className="admin-client">
        <div className="admin-client__container">
          <Loading isVisible={pending} />
          <div className="admin-client__header">
            <AdminTitle title="Клієнт" />
            <div className="admin-client__header-buttons">
              <Link href="/admin/book-appointment" passHref>
                <a className="admin-button admin-client__book-appointment" href="replace">
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
            </div>
          </div>
          {client && (
            <form className="admin-client__form">
              <div className="admin-client__client-name-wrapper">
                <span className="admin-client__avatar">{client.name.slice(0, 1)}</span>
                <textarea
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
                    <button onClick={handleSubmit} type="submit" className="admin-client__submit">
                      <DoneIconGreen />
                    </button>
                    <button onClick={handleCancel} type="button" className="admin-client__cancel">
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
            <div className="client-visits__container">
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button
                  onClick={handleEditVisit}
                  type="button"
                  className="client-visits__edit-visit"
                >
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
              <div className="client-visits__table-item">
                <p className="client-visits__text client-visits__text_date">06.09.2022</p>
                <p className="client-visits__text client-visits__text_type">
                  Комп’ютерна діагностика
                </p>
                <p className="client-visits__text client-visits__text_description">
                  Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
                </p>
                <p className="client-visits__text client-visits__text_price">499</p>
                <p className="client-visits__text client-visits__text_status">Виконано</p>
                <button type="button" className="client-visits__edit-visit">
                  <EditIcon />
                </button>
              </div>
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
