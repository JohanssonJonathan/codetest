import React, { Component } from "react";
import "./App.css";
import "./Keypad.css";
import view from "./img/view.png";
import hide from "./img/hide.png";

import { CSSTransition } from "react-transition-group";

const LoginOrRemoveButtonContainer = ({
  inputfieldLength,
  clickLogin,
  clickRemove
}) => {
  return (
    <div className="flex-flow button-container">
      <button
        style={{
          backgroundColor: inputfieldLength > 0 ? "#429781" : "#76C2B7"
        }}
        onClick={() => clickLogin()}
      >
        Logga in
      </button>
      <button
        style={{
          backgroundColor: inputfieldLength === 0 ? "#F2B6B6" : "#F57E7E"
        }}
        onClick={clickRemove}
      >
        X
      </button>
    </div>
  );
};

const Numbers = ({ currentNumbers, focus, onMouseEnterLeave, onClick }) => {
  return (
    <ul>
      {currentNumbers.map((item, i) => (
        <li
          className={item === null && "empty"}
          id={focus === i && item !== null && "focus"}
          onMouseEnter={() => {
            onMouseEnterLeave(item, i);
          }}
          onMouseLeave={() => {
            onMouseEnterLeave(item, i, "leave");
          }}
          onClick={() => onClick(item, i)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

const InputFieldContainer = ({
  inputfield,
  inputMessage,
  showInput,
  children
}) => {
  return (
    <div className="input-container">
      <CSSTransition
        in={inputMessage}
        timeout={200}
        classNames="message"
        onEntered={() => console.log("hej")}
      >
        <h5 className="message">Du kan endast trycka in en sex siffrig kod</h5>
      </CSSTransition>
      <input
        placeholder="Ange din kod"
        type={showInput ? "value" : "password"}
        value={inputfield}
        disabled={true}
      />

      {inputfield.length > 0 && children}
    </div>
  );
};

class Keypad extends Component {
  state = {
    currentNumbers: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    focus: null,
    inputfield: "",
    loggedIn: false,
    inputMessage: false,
    showInput: false
  };

  startShuffle = value => {
    const shuffled = this.state.currentNumbers
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);

    this.setState({
      currentNumbers: value ? this.state.currentNumbers : shuffled
    });
  };

  setTimeout = (value, time) => {
    window.setTimeout(() => this.setState({ [value]: false }), time);
  };

  setErrorMessage = inputfieldLength => {
    if (inputfieldLength === 6) {
      this.setState({ inputMessage: true });
      this.setTimeout("inputMessage", 4000);
    }
  };

  login = () => {
    const { inputfield } = this.state;
    if (inputfield.length > 0)
      this.setState(state => ({
        loggedIn: true,
        focus: null,
        inputfield: "",
        showInput: false
      }));
    this.setTimeout("loggedIn", 2000);
  };
  onMouseEnterLeave = (item, i, leave) => {
    if (item !== null) {
      this.setState({
        focus: leave ? null : i
      });
    }
  };
  removeNumber = () => {
    const { inputfield } = this.state;
    const newInputValue = inputfield.length - 1;
    this.setState(state => ({
      inputfield: inputfield.substring(0, inputfield.length - 1),
      focus: null,
      inputMessage: newInputValue < 6 ? false : true,
      showInput: false
    }));
  };
  keyPress = e => {
    const { inputfield, currentNumbers } = this.state;
    if (e.key === "Enter") {
      this.login();
      return;
    }
    currentNumbers.forEach((item, i) => {
      if (Number(e.key) === Number(item) && inputfield.length < 6) {
        this.setState(state => ({
          focus: i,
          inputfield: inputfield + e.key
        }));
      }
      this.setErrorMessage(inputfield.length);
    });

    if (e.key === "Backspace") {
      this.removeNumber();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", e => this.keyPress(e));
    window.addEventListener("keyup", e => this.setState({ focus: null }));

    this.startShuffle();
  }
  render() {
    const {
      currentNumbers,
      focus,
      inputfield,
      loggedIn,
      inputMessage,
      showInput
    } = this.state;

    return (
      <div className="keypad-container">
        <CSSTransition
          in={loggedIn}
          timeout={200}
          classNames="login-alert"
          onEntered={() => console.log("hej")}
        >
          <div className="login-alert">
            <h5>You logged in!</h5>
          </div>
        </CSSTransition>

        <h4>Logga in med personlig kod</h4>
        
        <InputFieldContainer inputfield={inputfield} showInput={showInput} inputMessage={inputMessage}>
          <img
            src={showInput ? view : hide}
            id="show"
            onClick={() => this.setState({ showInput: !showInput })}
          />
        </InputFieldContainer>

        <Numbers
          currentNumbers={currentNumbers}
          focus={focus}
          onMouseEnterLeave={this.onMouseEnterLeave}
          onClick={(item, i) => {
            if (item !== null && inputfield.length < 6) {
              this.setState({
                focus: i,
                inputfield: inputfield + item
              });
            }
            this.setErrorMessage(inputfield.length);
          }}
        />

        <LoginOrRemoveButtonContainer
          inputfieldLength={inputfield.length}
          clickLogin={() => this.login()}
          clickRemove={() => {
            const newInputValue = inputfield.length - 1;
            this.setState({
              inputfield: inputfield.substring(0, inputfield.length - 1),
              focus: null,
              inputMessage: newInputValue < 6 ? false : true
            });
          }}
        />
      </div>
    );
  }
}

export default Keypad;
