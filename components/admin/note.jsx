import { useState } from "react";
import cn from "classnames";

import TrashIcon from "../../public/icons/trash-icon.svg";

const Note = (props) => {
  const { className, note, deleteNote, onCheckedClick } = props;

  const [isChecked, setIsChecked] = useState(note.checked);
  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
    onCheckedClick(note.id);
  };

  return (
    <li key={note.id} className={cn("note", className)}>
      <label htmlFor={note.id} className="note__checkbox">
        <input checked={isChecked} onChange={handleCheckbox} type="checkbox" id={note.id} />
        <span />
      </label>
      <p className={cn("note__text", { "note__text_is-checked": isChecked })}>{note.value}</p>
      <button type="button" onClick={() => deleteNote(note.id)} className="note__delete">
        <TrashIcon />
      </button>
    </li>
  );
};

export default Note;
