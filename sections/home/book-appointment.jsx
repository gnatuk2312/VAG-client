import { useEffect, useState } from "react";

import moment from "moment";
import toast from "react-hot-toast";
import Container from "../../components/container";
import Logo from "../../components/home/logo";
import Calendar from "../../components/home/calendar";
import Form from "../../components/home/form";
import SuccessBookingModal from "../../components/home/success-booking-modal";
import { useInput } from "../../hooks/useInput";
import { getAppointmentsByDate, createAppointment } from "../../api/appointments";
import { availableHours } from "../../constants/date-picker";

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("");
  const [freeHours, setFreeHours] = useState([...availableHours]);
  const name = useInput("", { isEmpty: true });
  const phone = useInput("+380", { isEmpty: true, isPhoneError: true });
  const email = useInput("", { isEmailError: true });

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    setSelectedHour("");

    if (date) {
      getAppointmentsByDate(moment(date).format("YYYY-MM-DD"))
        .then((resp) => {
          if (resp.status === 200) {
            const { data } = resp;
            const { appointments } = data;
            const newFreeHours = [...availableHours];

            appointments.forEach(({ hour }) => {
              for (let index = 0; index < newFreeHours.length; index += 1) {
                if (newFreeHours[index] === hour) {
                  newFreeHours.splice(index, 1);
                }
              }
            });

            setFreeHours(newFreeHours);
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
        });
    }
  }, [date]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedHour === "" || selectedHour === null) {
      setSelectedHour(null);
      return;
    }

    const newAppointment = {
      name: name.value,
      phone: phone.value,
      hour: selectedHour,
      date: moment(date).format("YYYY-MM-DD"),
    };

    if (email.value) newAppointment.email = email.value;

    createAppointment(newAppointment)
      .then((resp) => {
        if (resp.status === 201) {
          setSuccessModalOpen(true);
          return;
        }

        return toast.error(
          `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
        );
      })
      .catch((err) => {
        toast.error(`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`);
      });
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
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
