import { useEffect, useState } from "react";
import cn from "classnames";
import { toast } from "react-hot-toast";
import moment from "moment";

import AdminTitle from "../admin-title";
import AdminInput from "../input";
import Loading from "../loading";
import CloseIcon from "../../../public/icons/close-icon.svg";
import removeEmptyKeysInObject from "../../../helpers/remove-empty-keys-in-object";
import { createVisit, getVisitByID, deleteVisitByID } from "../../../api/visits";

const AdminClientVisitModal = (props) => {
  const { options, isOpen, onCloseVisitModal } = props;
  const { variant, clientId, id } = options;

  const [clientVisit, setClientVisit] = useState({
    date: "",
    price: "",
    type: "",
    status: "",
    description: "",
  });

  const { date, price, type, status, description } = clientVisit;

  const [pending, setPending] = useState(false);

  const handleInputDate = (value) => setClientVisit({ ...clientVisit, date: value });
  const handleInputPrice = (value) => setClientVisit({ ...clientVisit, price: value });
  const handleInputType = (value) => setClientVisit({ ...clientVisit, type: value });
  const handleInputStatus = (value) => setClientVisit({ ...clientVisit, status: value });
  const handleInputDescription = (event) =>
    setClientVisit({ ...clientVisit, description: event.target.value });

  const clearForm = () => {
    setClientVisit({
      date: moment(new Date()).format("DD MMMM YYYY"),
      price: "",
      type: "",
      status: "",
      description: "",
      clientId,
    });
  };

  useEffect(() => {
    if (variant === "add" && clientId) {
      clearForm();
    } else if (isOpen === true && variant === "edit" && id) {
      clearForm();
      setPending(true);
      getVisitByID(id)
        .then((resp) => {
          if (resp.status === 200) {
            setClientVisit(resp.data.visit);
            return;
          }
          return toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
          );
        })
        .catch((err) => {
          toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`,
          );
        })
        .finally(() => setPending(false));
    }
  }, [isOpen]);

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    setPending(true);
    createVisit(removeEmptyKeysInObject(clientVisit))
      .then((resp) => {
        if (resp.status === 201) {
          toast.success("Візит успішно створено!");
          clearForm();
          return;
        }
        return toast.error(
          `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
        );
      })
      .catch((err) => {
        toast.error(`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`);
      })
      .finally(() => setPending(false));
  };
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    toast.success("Візит успішно редаговано");
  };
  const handleDeleteVisit = () => {
    setPending(true);
    deleteVisitByID(id)
      .then((resp) => {
        if (resp.status === 200) {
          toast.success("Візит успішно видалено!");
          onCloseVisitModal();
          return;
        }
        return toast.error(
          `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
        );
      })
      .catch((err) => {
        toast.error(`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className={cn("client-visit-modal", { "client-visit-modal_is-open": isOpen })}>
      <Loading isVisible={pending} />
      <div className="client-visit-modal__header">
        <AdminTitle title="Oпис виконаних робіт" />
        <div className="client-visit-modal__actions">
          {variant === "edit" && (
            <button
              type="button"
              onClick={handleDeleteVisit}
              className="client-visit-modal__delete"
            >
              Видалити
            </button>
          )}
          <button type="button" onClick={onCloseVisitModal} className="client-visit-modal__close">
            <CloseIcon />
          </button>
        </div>
      </div>
      <form>
        <div className="client-visit-modal__inputs-wrapper">
          <AdminInput label="Дата" value={date} onChange={handleInputDate} />
          <AdminInput label="Ціна" value={price} onChange={handleInputPrice} />
          <AdminInput
            label="Тип роботи"
            value={type}
            onChange={handleInputType}
            dropdown={["Комп’ютерна діагностика", "Ремонт"]}
          />
          <AdminInput
            label="Статус"
            name={status}
            value={status}
            onChange={handleInputStatus}
            dropdown={["Виконано", "Не виконано", "Оплачено", "Не оплачено"]}
          />
        </div>
        <div className="client-visit-modal__description">
          <span className="client-visit-modal__description-label">Опис</span>
          <textarea
            className="client-visit-modal__description-textarea"
            value={description}
            onChange={handleInputDescription}
          />
        </div>
        {variant === "edit" && (
          <button onClick={handleSubmitEdit} type="submit" className="client-visit-modal__submit">
            Зберегти
          </button>
        )}
        {variant === "add" && (
          <button onClick={handleSubmitAdd} type="submit" className="client-visit-modal__submit">
            Додати
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminClientVisitModal;
