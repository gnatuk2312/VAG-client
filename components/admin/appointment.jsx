import cn from "classnames";

const Appointment = (props) => {
  const { state, name, phone, hour, id } = props;

  return (
    <div className={cn("appointment", `appointment_${state}`)} key={id}>
      <div className="appointment__avatar">{name[0]}</div>
      <div className="appointment__body">
        <p className="appointment__name">{name}</p>
        <p className="appointment__description">Онлайн запис. Компютерна діагностика.</p>
        <p className="appointment__phone">{phone}</p>
      </div>
      <div className="appointment__time">{hour}</div>
    </div>
  );
};

export default Appointment;
