import React, { Component } from "react";
import "./App.css";
import "./Keypad.css";
import view from "./img/view.png"
import hide from "./img/hide.png"

import { CSSTransition } from "react-transition-group";

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
    currentNumbers.forEach((item, i) => {
      if (Number(e.key) === Number(item) && inputfield.length < 6) {
        this.setState(state => ({
          focus: i,
          inputfield: inputfield + e.key
        }));
      }
      this.setErrorMessage(inputfield.length);
    });

    if (e.key === "Enter") {
      this.login();
    }
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
              {/* <p>hej</p> */}
            </div>
        </CSSTransition>

        <h4>Logga in med personlig kod</h4>

        <div className="input-container">
          <CSSTransition
            in={inputMessage}
            timeout={200}
            classNames="message"
            onEntered={() => console.log("hej")}
          >
            <h5 className="message">
              Du kan endast trycka in en sex siffrig kod
            </h5>
          </CSSTransition>
          <input
            placeholder="Ange din kod"
            type={showInput ? "value" : "password"}
            value={inputfield}
            disabled={true}
          />

          {inputfield.length > 0 && (
            <img src={showInput?view:hide} id="show"
              onClick={() => this.setState({ showInput: !showInput })}
            />
          )}
        </div>
        <ul>
          {currentNumbers.map((item, i) => (
            <li
              className={item === null && "empty"}
              id={focus === i && item !== null && "focus"}
              onClick={() => {
                if (item !== null && inputfield.length < 6) {
                  this.setState({
                    focus: i,
                    inputfield: inputfield + item
                  });
                }
                this.setErrorMessage(inputfield.length);
              }}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex-flow button-container">
          <button
            style={{
              backgroundColor: inputfield.length > 0 ? "#429781" : "#76C2B7"
            }}
            onClick={() => {
              this.login();
            }}
          >
            Logga in
          </button>
          <button
            style={{
              backgroundColor: inputfield.length === 0 ? "#F2B6B6" : "#F57E7E"
            }}
            onClick={() => {
              const newInputValue = inputfield.length - 1;
              this.setState({
                inputfield: inputfield.substring(0, inputfield.length - 1),
                focus: null,
                inputMessage: newInputValue < 6 ? false : true
              });
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default Keypad;
