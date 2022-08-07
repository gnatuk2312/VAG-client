import { useState } from "react";

import Container from "../components/container";
import Logo from "../components/logo";
import Calendar from "../components/calendar";
import Form from "../components/form";
import SuccessBookingModal from "../components/success-booking-modal";
import { useInput } from "../hooks/useInput";

const BookAppointment = () => {
  const [date, setDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const name = useInput("", { isEmpty: true });
  const phone = useInput("+380", { isEmpty: true, isPhoneError: true });
  const email = useInput("", { isEmailError: true });

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedHour === "" || selectedHour === null) {
      setSelectedHour(null);
      return;
    }
    setSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setSelectedHour("");
    setDate(new Date());
    setSelectedHour("");
    name.setValue("");
    name.setDirty(false);
    phone.setValue("");
    phone.setDirty(false);
    email.setValue("");
    email.setDirty(false);
  };

  return (
    <>
      <section className="book-appointment" id="book-appointment">
        <Container>
          <div className="book-appointment__header">
            <Logo />
            <h5 className="book-appointment__title">Запис на діагностику онлайн</h5>
          </div>
          <div className="book-appointment__form-wrapper">
            <Calendar
              date={date}
              setDate={setDate}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
            />
            <Form
              nameValidation={name}
              phoneValidation={phone}
              emailValidation={email}
              onSubmit={handleSubmit}
            />
          </div>
        </Container>
      </section>
      <SuccessBookingModal
        isOpen={successModalOpen}
        onClose={handleSuccessModalClose}
        name={name.value}
        date={date}
        hour={selectedHour}
      />
    </>
  );
};

export default BookAppointment;
