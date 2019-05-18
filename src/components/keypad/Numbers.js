
import React from "react";
import "../../App.css";
import "../../css/keypad/Keypad.css";


const Numbers = ({ currentNumbers, focus, onMouseEnterLeave, onClick }) => {
    return (
      <ul>
        {currentNumbers.map((nr, i) => (
          <li
            key={i}
            className={nr === null ? "empty" : ""}
            id={(focus === i && nr !== null) ? "focus" :""}
            onMouseEnter={() => {
              onMouseEnterLeave(nr, i);
            }}
            onMouseLeave={() => {
              onMouseEnterLeave(nr, i, "leave");
            }}
            onClick={() => onClick(nr, i)}
          >
            {nr}
          </li>
        ))}
      </ul>
    );
  };

  export default Numbers