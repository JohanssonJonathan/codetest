import React from "react";
import "../../css/keypad/Keypad.css";

import { CSSTransition } from "react-transition-group";

const InputFieldContainer = ({
  inputfield,
  errorMessage,
  showPassword,
  children
}) => {
  return (
    <div className="input-container">
      <CSSTransition in={errorMessage} timeout={200} classNames="message">
        <h5 className="message">Du kan endast använda en sexsiffrig kod</h5>
      </CSSTransition>
      <input
        placeholder="Ange din kod"
        type={showPassword ? "value" : "password"}
        value={inputfield}
        disabled={true}
      />

      {inputfield.length > 0 && children}
    </div>
  );
};

export default InputFieldContainer;
