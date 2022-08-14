import { useState } from "react";
import cn from "classnames";
import { toast } from "react-hot-toast";

import AdminTitle from "../admin-title";
import AdminInput from "../input";
import CloseIcon from "../../../public/icons/close-icon.svg";

const AdminClientVisitModal = (props) => {
  const { options, isOpen, onCloseVisitModal } = props;
  // , clientId, visit
  const { variant } = options;
  const [clientVisit, setClientVisit] = useState({
    date: "",
    price: "",
    type: "",
    status: "",
    description: "",
  });

  // if (variant === "edit") {
  //   setClientVisit(visit);
  // }

  const { date, price, type, status, description } = clientVisit;

  const handleInputDate = (value) => setClientVisit({ ...clientVisit, date: value });
  const handleInputPrice = (value) => setClientVisit({ ...clientVisit, price: value });
  const handleInputType = (value) => setClientVisit({ ...clientVisit, type: value });
  const handleInputStatus = (value) => setClientVisit({ ...clientVisit, status: value });
  const handleInputDescription = (event) =>
    setClientVisit({ ...clientVisit, description: event.target.value });

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    toast.success("Успішно редаговано");
  };
  const handleSubmitAdd = (event) => {
    event.preventDefault();
    toast.success("Успішно додано");
  };

  return (
    <div className={cn("client-visit-modal", { "client-visit-modal_is-open": isOpen })}>
      <div className="client-visit-modal__header">
        <AdminTitle title="Oпис виконаних робіт" />
        <div className="client-visit-modal__actions">
          {variant === "edit" && (
            <button type="button" className="client-visit-modal__delete">
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
