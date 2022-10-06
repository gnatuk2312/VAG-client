import Container from "../../components/container";
import Logo from "../../components/home/logo";
import Calendar from "../../components/home/calendar";
import Form from "../../components/home/form";
import SuccessBookingModal from "../../components/home/success-booking-modal";
import { useInput } from "../../hooks/useInput";
import useBookAppointment from "../../hooks/useBookAppointment";

const BookAppointment = () => {
  const name = useInput("", { isEmpty: true });
  const phone = useInput("+380", { isEmpty: true, isPhoneError: true });
  const email = useInput("", { isEmailError: true });

  const {
    freeHours,
    successModalOpen,
    handleSubmit,
    handleSuccessModalClose,
    date,
    setDate,
    selectedHour,
    setSelectedHour,
  } = useBookAppointment({ name, phone, email }, false);

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
              freeHours={freeHours}
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
