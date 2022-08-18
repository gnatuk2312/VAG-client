import { useState } from "react";
import cn from "classnames";

import { formatPhoneNumber } from "../../helpers/format-phone-number";

const AdminInput = (props) => {
  const { className, label, value, onChange, dropdown, isPhoneNumber } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleDropdownClick = (value) => {
    onChange(value);
    setIsDropdownOpen(false);
  };
  const handleChangeInput = (event) => {
    if (isPhoneNumber) {
      onChange(formatPhoneNumber(event.target.value));
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <div className={cn("admin-input", className)}>
      <span>{label}</span>
      <input type="text" autoComplete="off" onChange={handleChangeInput} value={value} />
      {dropdown && (
        <button
          onClick={handleDropdown}
          type="button"
          className={cn("admin-input__open-dropdown", {
            "admin-input__open-dropdown_is-dropdown-open": isDropdownOpen,
          })}
        >
          <div />
        </button>
      )}
      {dropdown && (
        <div
          className={cn("admin-input__dropdown", {
            "admin-input__dropdown_is-open": isDropdownOpen,
          })}
        >
          {dropdown.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleDropdownClick(item)}
              className="admin-input__dropdown-button"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInput;
