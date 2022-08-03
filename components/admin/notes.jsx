import { useEffect, useState } from "react";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";

import Note from "./note";

const Notes = (props) => {
  const { className } = props;

  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes")));
  }, []);

  const addNote = (event, value, id) => {
    event.preventDefault();

    if (value === "") return;

    let notes;
    if (localStorage.getItem("notes") === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem("notes"));
    }
    notes.push({ value, id, checked: false });
    localStorage.setItem("notes", JSON.stringify(notes));

    setInputValue("");
    setNotes(notes);
  };

  const deleteNote = (id) => {
    const notes = JSON.parse(localStorage.getItem("notes")).filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    setNotes(notes);
  };

  const handleCheckedClick = (id) => {
    const noteIndex = JSON.parse(localStorage.getItem("notes")).findIndex((note) => note.id === id);
    const notes = JSON.parse(localStorage.getItem("notes"));
    notes[noteIndex].checked = !notes[noteIndex].checked;
    localStorage.setItem("notes", JSON.stringify(notes));
    setNotes(notes);
  };

  return (
    <div className={cn("notes", className)}>
      <div className="notes__wrapper">
        <p className="notes__title">Нотатки</p>
        <ul className="notes__list">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              onCheckedClick={handleCheckedClick}
            />
          ))}
        </ul>
        <form className="notes__form">
          <input
            className="notes__input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Записати..."
            autoComplete="off"
            type="text"
          />
          <button
            type="submit"
            onClick={(event) => addNote(event, inputValue, uuidv4())}
            className="notes__submit"
          >
            +
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
