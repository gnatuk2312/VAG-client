import { useEffect, useState } from "react";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import toast from "react-hot-toast";
import moment from "moment";
import "moment/locale/uk";
import { useInView } from "react-intersection-observer";

import { isWeekday } from "../../constants/common";
import LocalDate from "../../components/admin/local-date";
import Appointment from "../../components/admin/appointment";
import Notes from "../../components/admin/notes";
import AddBigIcon from "../../public/icons/add-big-icon.svg";
import RefreshIcon from "../../public/icons/refresh-icon.svg";
import { getAllAppointments, getAppointmentsByDate } from "../../api/appointments";

registerLocale("uk", uk);
moment.locale("uk");

const AdminHome = () => {
  const { ref, inView, entry } = useInView({ triggerOnce: true });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState([]);
  const [requestedBy, setRequestedBy] = useState("refresh");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (entry?.isIntersecting) setPage((currPage) => currPage + 1);
  }, [inView]);

  useEffect(() => {
    if (requestedBy === "refresh") {
      setIsLoading(true);
      getAllAppointments(page, 10)
        .then((resp) => {
          setIsLoading(false);
          if (resp.status === 200) {
            setAppointmentsByDate([]);
            setAppointments((currAppointments) => [...currAppointments, ...resp.data.appointments]);
            return;
          }
          return toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
          );
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`,
          );
        });
    } else if (requestedBy === "calendar") {
      setIsLoading(true);
      getAppointmentsByDate(moment(selectedDate).format("YYYY-MM-DD"))
        .then((resp) => {
          setIsLoading(false);
          if (resp.status === 200) {
            setAppointments([]);
            setAppointmentsByDate(resp.data.appointments);
            return;
          }
          return toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${resp?.message}`,
          );
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(
            `У нас невідома помилка, спробуйте будь-ласка пізніше. Деталі: ${err.message}`,
          );
        });
    }
  }, [selectedDate, page]);

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
            <button
              type="button"
              className="admin-home__appointments-refresh"
              onClick={() => {
                setSelectedDate(new Date());
                setRequestedBy("refresh");
                setAppointments([]);
                setPage(1);
              }}
            >
              <RefreshIcon />
            </button>
            <div className="admin-home__appointments-wrapper">
              {appointments.length > 0 ? (
                appointments.map(({ appointments, _id: date }) => (
                  <div key={date}>
                    <p className="admin-home__appointments-date">
                      {moment(date).format("Do MMMM YYYY")}
                    </p>
                    {appointments.map(({ hour, name, phone, _id: id }) => (
                      <Appointment hour={hour} name={name} phone={phone} state="new" key={id} />
                    ))}
                  </div>
                ))
              ) : (
                <>
                  <p className="admin-home__appointments-date">
                    {moment(selectedDate).format("Do MMMM YYYY")}
                  </p>
                  {appointmentsByDate.map(({ hour, name, phone, _id: id }) => (
                    <Appointment hour={hour} name={name} phone={phone} state="new" key={id} />
                  ))}
                </>
              )}
              {appointments.length > 0 && <div ref={ref} />}
              {isLoading && <h1>Loading...</h1>}
            </div>
          </div>
          <div>
            <div className="admin-home__calendar admin-calendar">
              <DatePicker
                selected={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  setRequestedBy("calendar");
                }}
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
