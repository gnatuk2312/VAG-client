import cn from "classnames";

const Appointment = (props) => {
  const { state } = props;

  return (
    <div className={cn("appointment", `appointment_${state}`)}>
      <div className="appointment__avatar">О</div>
      <div className="appointment__body">
        <p className="appointment__name">Олег</p>
        <p className="appointment__description">Онлайн запис. Компютерна діагностика</p>
        <p className="appointment__phone">+38 097 128 58 26</p>
      </div>
      <div className="appointment__time">11:00</div>
    </div>
  );
};

export default Appointment;
