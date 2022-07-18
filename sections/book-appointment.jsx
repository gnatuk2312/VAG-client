import { useState } from "react";
import toast from "react-hot-toast";

import Container from "../components/container";
import Logo from "../components/logo";
import Calendar from "../components/calendar";
import Form from "../components/form";
import { useInput } from "../hooks/useInput";

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("");
  const name = useInput("", { isEmpty: true });
  const phone = useInput("+380", { isEmpty: true, isPhoneError: true });
  const email = useInput("", { isEmpty: true, isEmailError: true });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedHour === "" || selectedHour === null) {
      setSelectedHour(null);
    } else {
      toast.success("Ви успішно записались на візит");
      setDate(new Date());
      setSelectedHour("");
      name.setValue("");
      name.setDirty(false);
      phone.setValue("");
      phone.setDirty(false);
      email.setValue("");
      email.setDirty(false);
    }
  };

  return (
    <section className="book-appointment">
      <Container>
        <div className="book-appointment__header">
          <Logo />
          <h4 className="book-appointment__title">Запис на діагностику онлайн</h4>
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
  );
};

export default BookAppointment;
