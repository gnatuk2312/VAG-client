import cn from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";

import { isWeekday, availableHours } from "../constants/date-picker";

registerLocale("uk", uk);

const Calendar = (props) => {
  const { date, setDate, selectedHour, setSelectedHour } = props;
  const dateNow = new Date();
  const twoMonthsFromNow = dateNow.setMonth(dateNow.getMonth() + 2);

  return (
    <div className="calendar">
      <p className="calendar__hint">1. Вибери зручну для тебе дату та годину</p>
      <div className="calendar__wrapper">
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          inline
          locale="uk"
          minDate={new Date()}
          maxDate={twoMonthsFromNow}
          filterDate={isWeekday}
        />
        <ul className="calendar__hours-list">
          {availableHours.map((hour) => (
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
          {availableHours.length === 0 && (
            <p className="calendar__no-hours">На цю дату вільних годин немає</p>
          )}
          {selectedHour === null && <p className="calendar__error">*виберіть годину прийому</p>}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
