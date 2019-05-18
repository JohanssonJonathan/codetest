import React, { Component } from "react";
import "../../App.css";
import "../../css/keypad/Keypad.css";
import passwordHidden from "../../img/passwordHidden.png";
import passwordVisible from "../../img/passwordVisible.png";
import LoginOrRemoveButtonContainer from "./LoginOrRemoveButtonContainer";
import Numbers from "./Numbers";
import InputFieldContainer from "./InputFieldContainer";
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
    errorMessage: false,
    showPassword: false
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
      this.setState({ errorMessage: true });
      this.setTimeout("errorMessage", 4000);
    }
  };

  login = () => {
    const { inputfield } = this.state;
    if (inputfield.length > 0)
      this.setState(state => ({
        loggedIn: true,
        focus: null,
        inputfield: "",
        showPassword: false
      }));
    this.setTimeout("loggedIn", 2000);
  };

  onMouseEnterLeave = (nr, i, leave) => {
    if (nr !== null) {
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
      errorMessage: newInputValue < 6 ? false : true,
      showPassword: false
    }));
  };
  
  keyPress = e => {
    const { inputfield, currentNumbers } = this.state;
    if (e.key === "Enter") {
      this.login();
      return;
    }
    currentNumbers.forEach((nr, i) => {
      if (Number(e.key) === Number(nr) && inputfield.length < 6) {
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
      errorMessage,
      showPassword
    } = this.state;

    return (
      <div className="keypad-container">
        <CSSTransition in={loggedIn} timeout={200} classNames="login-alert">
          <div className="login-alert">
            <h5>You logged in!</h5>
          </div>
        </CSSTransition>

        <h4>Logga in med personlig kod</h4>

        <InputFieldContainer
          inputfield={inputfield}
          showPassword={showPassword}
          errorMessage={errorMessage}
        >
          <img
            src={showPassword ?  passwordVisible:passwordHidden}
            id="show"
            onClick={() => this.setState({ showPassword: !showPassword })}
          />
        </InputFieldContainer>

        <Numbers
          currentNumbers={currentNumbers}
          focus={focus}
          onMouseEnterLeave={this.onMouseEnterLeave}
          onClick={(nr, i) => {
            if (nr !== null && inputfield.length < 6) {
              this.setState({
                focus: i,
                inputfield: inputfield + nr
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
              errorMessage: newInputValue < 6 ? false : true
            });
          }}
        />
      </div>
    );
  }
}

export default Keypad;
