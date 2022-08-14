import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import toast from "react-hot-toast";

import AdminTitle from "../../../components/admin/admin-title";
import { clients } from "../../../constants/common";
import { formatPhoneNumber } from "../../../helpers/formatPhoneNumber";
import AddBigIcon from "../../../public/icons/add-big-icon.svg";
import AddBigIconLight from "../../../public/icons/add-big-icon-light.svg";
import EditIcon from "../../../public/icons/edit-icon.svg";
import DoneIconGreen from "../../../public/icons/done-icon-green.svg";

const AdminClient = () => {
  const clientData = clients[0];

  const [client, setClient] = useState(clientData);
  const { _id, name, phone, email, carBrand, carModel, licensePlate, favorite } = client;

  const [clientDisableEditing, setClientDisableEditing] = useState(true);

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
    // update client
    setClientDisableEditing(true);
    toast.success("Успішно редаговано");
  };

  const handleEditVisit = () => {
    // open modal and pass ID there
  };
  const handleAddNewVisit = () => {
    // open modal and pass ID there
  };

  return (
    <section className="admin-client">
      <div className="admin-client__container">
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
              onClick={() => handleAddNewVisit()}
              type="button"
              className="admin-button admin-client__add-new-visit"
            >
              <AddBigIcon />
              Додати новий запис
            </button>
          </div>
        </div>
        <form className="admin-client__form">
          <div className="admin-client__client-name-wrapper">
            <span className="admin-client__avatar">{name.slice(0, 1)}</span>
            <textarea
              value={name}
              onChange={handleClientInputs}
              disabled={clientDisableEditing}
              name="name"
              type="text"
              className="admin-client__input admin-client__input_name"
            />
          </div>
          <input
            value={phone}
            onChange={handlePhoneInput}
            disabled={clientDisableEditing}
            name="phone"
            type="text"
            className="admin-client__input admin-client__input_phone"
          />
          <div className="admin-client__car-wrapper">
            <input
              value={carBrand}
              onChange={handleClientInputs}
              disabled={clientDisableEditing}
              name="carBrand"
              type="text"
              className="admin-client__input admin-client__input_carBrand"
            />
            <input
              value={carModel}
              onChange={handleClientInputs}
              disabled={clientDisableEditing}
              name="carModel"
              type="text"
              className="admin-client__input admin-client__input_carModel"
            />
          </div>
          <input
            value={licensePlate}
            onChange={handleClientInputs}
            disabled={clientDisableEditing}
            name="licensePlate"
            type="text"
            className="admin-client__input admin-client__input_license-plate"
          />
          <input
            value={email}
            onChange={handleClientInputs}
            disabled={clientDisableEditing}
            name="email"
            type="text"
            className="admin-client__input admin-client__input_email"
          />
          <div className="admin-client__actions">
            <div className="admin-client__edit-client-wrapper">
              {clientDisableEditing && (
                <button
                  onClick={handleAllowClientEditing}
                  type="button"
                  className="admin-client__edit-client"
                >
                  <EditIcon />
                </button>
              )}
              {!clientDisableEditing && (
                <button onClick={handleSubmit} type="submit" className="admin-client__submit">
                  <DoneIconGreen />
                </button>
              )}
            </div>
            <label
              htmlFor={_id}
              className={cn("admin-client__favorite", {
                "admin-client__favorite_is-disabled": clientDisableEditing,
              })}
            >
              <input
                checked={favorite}
                onChange={handleFavorite}
                disabled={clientDisableEditing}
                type="checkbox"
                id={_id}
              />
              <span />
            </label>
          </div>
        </form>
      </div>
      <div className="admin-client__visits client-visits">
        <div className="client-visits__header">
          <p className="client-visits__header-label client-visits__header-label_date">Дата</p>
          <p className="client-visits__header-label client-visits__header-label_type">Тип роботи</p>
          <p className="client-visits__header-label client-visits__header-label_description">
            Опис
          </p>
          <p className="client-visits__header-label client-visits__header-label_price">Ціна</p>
          <p className="client-visits__header-label client-visits__header-label_status">Статус</p>
        </div>
        <div className="client-visits__container">
          <div className="client-visits__table-item">
            <p className="client-visits__text client-visits__text_date">06.09.2022</p>
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
            <p className="client-visits__text client-visits__text_description">
              Несправний датчик температури повітря салону, помилка 2738, записати на ремонт.
            </p>
            <p className="client-visits__text client-visits__text_price">499</p>
            <p className="client-visits__text client-visits__text_status">Виконано</p>
            <button
              onClick={() => handleEditVisit()}
              type="button"
              className="client-visits__edit-visit"
            >
              <EditIcon />
            </button>
          </div>
          <div className="client-visits__table-item">
            <p className="client-visits__text client-visits__text_date">06.09.2022</p>
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
            <p className="client-visits__text client-visits__text_type">Комп’ютерна діагностика</p>
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
    </section>
  );
};

export default AdminClient;
