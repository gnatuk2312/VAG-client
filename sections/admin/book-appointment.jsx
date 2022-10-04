import { useEffect, useState } from "react";
import cn from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import toast from "react-hot-toast";

import moment from "moment";
import { isWeekday, adminHours } from "../../constants/common";
import Form from "../../components/home/form";
import LocalDate from "../../components/admin/local-date";
import AdminTitle from "../../components/admin/admin-title";
import { useInput } from "../../hooks/useInput";
import { getAppointmentsByDate, createAppointment } from "../../api/appointments";

registerLocale("uk", uk);

const AdminBookAppointment = () => {
  const [datePickerDate, setDatePickerDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const [freeHours, setFreeHours] = useState([...adminHours]);
  const name = useInput("", { isEmpty: true });
  const phone = useInput("+380", { isEmpty: true, isPhoneError: true });
  const email = useInput("", { isEmailError: true });

  useEffect(() => {
    setDatePickerDate(new Date());
    setMinDate(new Date());
  }, []);

  useEffect(() => {
    setSelectedHour("");

    if (datePickerDate) {
      getAppointmentsByDate(moment(datePickerDate).format("YYYY-MM-DD"))
        .then((resp) => {
          if (resp.status === 200) {
            const { data } = resp;
            const { appointments } = data;
            const newFreeHours = [...adminHours];

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
  }, [datePickerDate]);

  const afterSuccessSubmit = () => {
    setDatePickerDate(new Date());
    setSelectedHour("");
    setFreeHours([...adminHours]);
    name.setValue("");
    name.setDirty(false);
    phone.setValue("");
    phone.setDirty(false);
    email.setValue("");
    email.setDirty(false);
  };

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
      date: moment(datePickerDate).format("YYYY-MM-DD"),
    };

    if (email.value) newAppointment.email = email.value;

    createAppointment(newAppointment)
      .then((resp) => {
        if (resp.status === 201) {
          toast.success("Успішно!");
          afterSuccessSubmit();
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

  return (
    <section className="admin-book-appointment">
      <div className="admin-book-appointment__container">
        <div className="admin-book-appointment__header">
          <AdminTitle title="Запис до автоелектрика" />
          <LocalDate className="admin-book-appointment__local-date" />
        </div>
        <div className="admin-book-appointment__body">
          <div className="admin-book-appointment__calendar-wrapper">
            <div className="admin-calendar">
              <DatePicker
                selected={datePickerDate}
                minDate={minDate}
                onChange={(newDate) => setDatePickerDate(newDate)}
                inline
                locale="uk"
                filterDate={isWeekday}
              />
            </div>
          </div>
          <ul className="admin-book-appointment__available-hours">
            {freeHours.map((hour) => (
              <li key={hour}>
                <button
                  onClick={() => setSelectedHour(hour)}
                  type="button"
                  className={cn(
                    "admin-book-appointment__hour",
                    {
                      "admin-book-appointment__hour_selected": selectedHour === hour,
                    },
                    {
                      "admin-book-appointment__hour_error": selectedHour === null,
                    },
                  )}
                >
                  {hour}
                </button>
              </li>
            ))}
            {adminHours.length === 0 && (
              <p className="admin-book-appointment__no-hours">На цю дату вільних годин немає</p>
            )}
            {selectedHour === null && (
              <p className="admin-book-appointment__hours-error">*виберіть годину прийому</p>
            )}
          </ul>
          <div className="admin-book-appointment__form-wrapper">
            <Form
              className="admin-book-appointment__form"
              nameValidation={name}
              phoneValidation={phone}
              emailValidation={email}
              onSubmit={handleSubmit}
              submitText="Записати"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminBookAppointment;
