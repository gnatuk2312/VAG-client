import { useEffect, useState } from "react";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import toast from "react-hot-toast";
import moment from "moment";
import "moment/locale/uk";

import { isWeekday } from "../../constants/common";
import LocalDate from "../../components/admin/local-date";
import Appointment from "../../components/admin/appointment";
import Notes from "../../components/admin/notes";
import AddBigIcon from "../../public/icons/add-big-icon.svg";
import RefreshIcon from "../../public/icons/refresh-icon.svg";
import { getAllAppointments /* , getAppointmentsByDate */ } from "../../api/appointments";

registerLocale("uk", uk);
moment.locale("uk");

/*
 * TODO: Write code for making request after:
 * 1. Change date (byDate).
 * 2. Refresh date/Loaded page (all).
 * 3. Pagination just for all.
 */

const AdminHome = () => {
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAllAppointments(1, 10)
      .then((resp) => {
        if (resp.status === 200) {
          setAppointments(resp.data.appointments);
          return;
        }
        return toast.error(
          `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
        );
      })
      .catch((err) => {
        toast.error(`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`);
      });
  }, []);

  // useEffect(() => {
  // getAppointments(1, 10)
  //   .then((resp) => {
  //     if (resp.status === 200) {
  //       setAppointments(resp.data.appointments);
  //       return;
  //     }
  //     return toast.error(
  //       `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
  //     );
  //   })
  //   .catch((err) => {
  //     toast.error(`У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`);
  //   });
  // }, [datePickerDate]);

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
              {appointments.map(({ appointments, _id: date }) => (
                <div key={date}>
                  <p className="admin-home__appointments-date">
                    {moment(date).format("Do MMMM YYYY")}
                  </p>
                  {appointments.map(({ hour, name, phone, _id: id }) => (
                    <Appointment hour={hour} name={name} phone={phone} state="new" key={id} />
                  ))}
                </div>
              ))}
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
