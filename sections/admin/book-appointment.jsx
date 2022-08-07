import { useEffect, useState } from "react";
import cn from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import toast from "react-hot-toast";

import { isWeekday } from "../../constants/date-picker";
import { adminHours } from "../../constants/common";
import Form from "../../components/form";
import LocalDate from "../../components/admin/local-date";
import AdminTitle from "../../components/admin/admin-title";
import { useInput } from "../../hooks/useInput";

registerLocale("uk", uk);

const AdminBookAppointment = () => {
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [minDate, setMinDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const name = useInput("", { isEmpty: true });
  const phone = useInput("+380", { isEmpty: true, isPhoneError: true });
  const email = useInput("", { isEmailError: true });

  useEffect(() => {
    setDatePickerDate(new Date());
    setMinDate(new Date());
  }, []);

  const handleClearFormData = () => {
    setSelectedHour("");
    setDatePickerDate(new Date());
    setSelectedHour("");
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
    toast.success("Успішно!");
    handleClearFormData();
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
            {adminHours.map((hour) => (
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
