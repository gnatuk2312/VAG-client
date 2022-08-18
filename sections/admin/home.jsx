import { useEffect, useState } from "react";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";

import { isWeekday } from "../../constants/date-picker";
import LocalDate from "../../components/admin/local-date";
import Appointment from "../../components/admin/appointment";
import Notes from "../../components/admin/notes";
import AddBigIcon from "../../public/icons/add-big-icon.svg";
import RefreshIcon from "../../public/icons/refresh-icon.svg";

registerLocale("uk", uk);

const AdminHome = () => {
  const [datePickerDate, setDatePickerDate] = useState(new Date());

  useEffect(() => {
    setDatePickerDate(new Date());
  }, []);

  return (
    <section className="admin-home">
      <div className="admin-home__container">
        <div className="admin-home__left-content">
          <LocalDate className="admin-home__date" />
          <div className="admin-home__buttons">
            <Link href="/admin/book-appointment" passHref>
              <a className="admin-button admin-home__button-book" href="replace">
                <AddBigIcon />
                Записати на прийом
              </a>
            </Link>
            <div className="admin-home__new-appointments-hint">
              <span>+2</span>
              <p>Нові записи онлайн</p>
            </div>
            <Link href="/admin/clients/new-client" passHref>
              <a className="admin-button admin-home__button-new-client" href="replace">
                <AddBigIcon />
                Створити клієнта
              </a>
            </Link>
          </div>
        </div>
        <div className="admin-home__right-content">
          <div className="admin-home__appointments">
            <button type="button" className="admin-home__appointments-refresh">
              <RefreshIcon />
            </button>
            <div className="admin-home__appointments-wrapper">
              <p className="admin-home__appointments-date">6 вересня 2022</p>
              <Appointment state="new" />
              <Appointment state="old" />
              <Appointment state="now" />
              <Appointment state="new" />
              <Appointment state="old" />
              <Appointment state="now" />
              <Appointment state="now" />
              <Appointment state="now" />
              <Appointment state="now" />
              <Appointment state="now" />
              <Appointment state="now" />
              <Appointment state="now" />
            </div>
          </div>
          <div>
            <div className="admin-home__calendar admin-calendar">
              <DatePicker
                selected={datePickerDate}
                onChange={(newDate) => setDatePickerDate(newDate)}
                inline
                locale="uk"
                filterDate={isWeekday}
              />
            </div>
            <Notes className="admin-home__notes" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminHome;
