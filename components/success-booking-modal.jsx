import cn from "classnames";
import Image from "next/image";

import CloseIcon from "../public/icons/close-icon.svg";
import DoneIcon from "../public/images/done.png";

const SuccessBookingModal = (props) => {
  const { isOpen, onClose, name, date, hour } = props;

  return (
    <div onClick={onClose} className={cn("booking-modal", { "booking-modal_is-visible": isOpen })}>
      <div onClick={(e) => e.stopPropagation()} className="booking-modal__wrapper">
        <button type="button" onClick={onClose} className="booking-modal__close-button">
          <CloseIcon />
        </button>
        <div className="booking-modal__body">
          <p className="booking-modal__text">Дякуємо {name}, ви успішно записались на візит!</p>
          <div className="booking-modal__done-image-wrapper">
            <Image src={DoneIcon} alt="Successfully booked" placeholder="blur" />
          </div>
          <p className="booking-modal__text">
            Чекаємо вас {date !== null ? date.toLocaleDateString("uk") : ""} о {hour} у нас! <br />{" "}
            <br /> м. Тернопіль, вул. Бродівська 59
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessBookingModal;
