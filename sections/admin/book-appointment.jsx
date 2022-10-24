import { useEffect, useState } from "react";
import cn from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";

import { isWeekday } from "../../constants/common";
import Form from "../../components/home/form";
import LocalDate from "../../components/admin/local-date";
import AdminTitle from "../../components/admin/admin-title";
import { useInput } from "../../hooks/useInput";
import useBookAppointment from "../../hooks/useBookAppointment";

registerLocale("uk", uk);

const AdminBookAppointment = () => {
  const [minDate, setMinDate] = useState(null);
  const name = useInput("", { isEmpty: true });
  const phone = useInput("+380", { isEmpty: true, isPhoneError: true });
  const email = useInput("", { isEmailError: true });

  useEffect(() => {
    setMinDate(new Date());
    name.setValue(localStorage.getItem("clientName") || "");
    phone.setValue(localStorage.getItem("clientPhone") || "");
    localStorage.removeItem("clientName");
    localStorage.removeItem("clientPhone");
  }, []);

  const { date, setDate, freeHours, setSelectedHour, selectedHour, handleSubmit } =
    useBookAppointment({ name, phone, email }, true);

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
                selected={date}
                minDate={minDate}
                onChange={(newDate) => setDate(newDate)}
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
            {freeHours.length === 0 && (
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
