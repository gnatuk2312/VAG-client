import cn from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";

import { useState } from "react";
import { isWeekday } from "../../constants/common";

registerLocale("uk", uk);

const Calendar = (props) => {
  const { date, setDate, selectedHour, setSelectedHour, freeHours } = props;

  const [minDate, ,] = useState(new Date());
  const [maxDate, ,] = useState(new Date().setMonth(new Date().getMonth() + 2));

  return (
    <div className="calendar">
      <p className="calendar__hint">1. Вибери зручну для тебе дату та годину</p>
      <div className="calendar__wrapper">
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          inline
          locale="uk"
          minDate={minDate}
          maxDate={maxDate}
          filterDate={isWeekday}
        />
        <ul className="calendar__hours-list">
          {freeHours.map((hour) => (
            <li className="calendar__hours-item" key={hour}>
              <button
                type="button"
                onClick={() => setSelectedHour(hour)}
                className={cn(
                  "calendar__hour",
                  {
                    calendar__hour_selected: selectedHour === hour,
                  },
                  {
                    calendar__hour_error: selectedHour === null,
                  },
                )}
              >
                {hour}
              </button>
            </li>
          ))}
          {freeHours.length === 0 && (
            <p className="calendar__no-hours">На цю дату вільних годин немає</p>
          )}
          {selectedHour === null && <p className="calendar__error">*виберіть годину прийому</p>}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
