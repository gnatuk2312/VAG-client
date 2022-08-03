import { useState, useEffect } from "react";
import cn from "classnames";

const LocalDate = (props) => {
  const { className } = props;
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return (
    <div className={cn("local-date", className)}>
      <p className="local-date__time">
        {`0${date.getHours()}`.slice(-2)}
        <span>:</span>
        {`0${date.getMinutes()}`.slice(-2)}
      </p>
      <p className="local-date__day">
        {date.toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" })}
      </p>
    </div>
  );
};

export default LocalDate;
