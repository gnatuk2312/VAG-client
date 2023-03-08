import { useEffect, useState, useRef, useContext } from "react";
import cn from "classnames";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import toast from "react-hot-toast";
import moment from "moment";
import "moment/locale/uk";
import { useInView } from "react-intersection-observer";
import Cookies from "js-cookie";

import { isWeekday } from "../../constants/common";
import LocalDate from "../../components/admin/local-date";
import Appointment from "../../components/admin/appointment";
import Notes from "../../components/admin/notes";
import AddBigIcon from "../../public/icons/add-big-icon.svg";
import RefreshIcon from "../../public/icons/refresh-icon.svg";
import { getAllAppointments, getAppointmentsByDate } from "../../api/appointments";
import { GlobalContext } from "../../context/state";

registerLocale("uk", uk);
moment.locale("uk");

const AdminHome = () => {
  const { ref, inView, entry } = useInView();

  const { setAdminLoggedOut } = useContext(GlobalContext);

  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState([]);
  const [requestedBy, setRequestedBy] = useState("refresh");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const stateOfTheAppointment = (appointmentDate, createdAt) => {
    const lastDate = Number(JSON.parse(localStorage.getItem("admin-last-time")));
    const appointmentDateUNIX = new Date(appointmentDate).getTime();
    const createdAtUNIX = new Date(createdAt).getTime();

    if (appointmentDateUNIX > Date.now() && createdAtUNIX < lastDate) {
      return "now";
    }
    if (createdAtUNIX > lastDate) {
      return "new";
    }
    return "old";
  };

  if (!Cookies.get("refreshToken")) {
    setAdminLoggedOut();
    toast("Спробуйте увійти заново", { icon: "⚠️" });
  }

  const appList = useRef();
  const isFirst = useRef(true);

  useEffect(() => {
    setSelectedDate(new Date());
    setInterval(() => {
      localStorage.setItem("admin-last-time", JSON.stringify(Date.now()));
    }, 60000);
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting) setPage((currPage) => currPage + 1);
  }, [inView]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (requestedBy === "refresh") {
      setIsLoading(true);
      getAllAppointments(page, 10)
        .then((resp) => {
          setIsLoading(false);
          if (resp.status === 200) {
            setAppointmentsByDate([]);
            setAppointments((currAppointments) => {
              const appointmetsForUpdating = [...currAppointments];

              const lastDateGroupCurr = appointmetsForUpdating[appointmetsForUpdating.length - 1];
              const lastDateGroupNew = resp.data.appointments[0];

              if (lastDateGroupCurr?._id === lastDateGroupNew?._id) {
                appointmetsForUpdating[appointmetsForUpdating.length - 1].appointments = [
                  ...appointmetsForUpdating[appointmetsForUpdating.length - 1]?.appointments,
                  ...resp.data.appointments[0]?.appointments,
                ];
                resp.data.appointments.splice(0, 1);
              }

              return [...appointmetsForUpdating, ...resp.data.appointments];
            });
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
  }, [page, requestedBy, selectedDate]);

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
              className={cn("admin-home__appointments-refresh", {
                "admin-home__appointments-refresh_is-loading": isLoading,
              })}
              onClick={() => {
                setSelectedDate(new Date());
                setRequestedBy("refresh");
                setAppointments([]);
                setPage(1);
                appList?.current?.scrollTo({
                  top: 0,
                  left: 0,
                });
              }}
            >
              <RefreshIcon />
            </button>
            {(appointments.length > 0 || appointmentsByDate.length > 0) && (
              <div ref={appList} className="admin-home__appointments-wrapper">
                {appointments.length > 0 ? (
                  appointments.map(({ appointments, _id: date }) => (
                    <div key={date}>
                      <p className="admin-home__appointments-date">
                        {moment(date).format("Do MMMM YYYY")}
                      </p>
                      {appointments.map(({ date, createdAt, hour, name, phone, _id: id }) => (
                        <Appointment
                          hour={hour}
                          name={name}
                          phone={phone}
                          state={stateOfTheAppointment(date, createdAt)}
                          key={id}
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  <>
                    <p className="admin-home__appointments-date">
                      {moment(selectedDate).format("Do MMMM YYYY")}
                    </p>
                    {appointmentsByDate.map(({ date, createdAt, hour, name, phone, _id: id }) => (
                      <Appointment
                        hour={hour}
                        name={name}
                        phone={phone}
                        state={stateOfTheAppointment(date, createdAt)}
                        key={id}
                      />
                    ))}
                  </>
                )}
                {appointments.length > 0 && (
                  <div style={{ width: "30px", height: "30px" }} ref={ref} />
                )}
              </div>
            )}
          </div>
          <div>
            <div className="admin-home__calendar admin-calendar">
              <DatePicker
                selected={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  setRequestedBy("calendar");
                  setPage(1);
                  appList?.current?.scrollTo({
                    top: 0,
                    left: 0,
                  });
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
