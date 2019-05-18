import React, { Component } from "react";
import "./App.css";
import "./Keypad.css";

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
    inputMessage: false
  };

  login = () => {
    alert("You logged in");
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

  componentDidMount() {
    this.startShuffle();
  }
  render() {
    const {
      currentNumbers,
      focus,
      inputfield,
      loggedIn,
      inputMessage
    } = this.state;
    return (
      <div className="keypad-container">
        {loggedIn && (
          <div id="login-alert">
            <h5>You logged in!</h5>
          </div>
        )}

        <h4>Logga in med personlig kod</h4>
       
        <div className="input-container">
        {inputMessage && (
          <h5 id="message">Du kan endast ha sex nummer</h5>
        )}
          <input placeholder="Ange din kod" value={inputfield} />
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
                if (inputfield.length === 6) {
                  this.setState({ inputMessage: true });
                  window.setTimeout(()=>this.setState({inputMessage:false}),3000)
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex-flow button-container">
          <button
            onClick={() => {
              if (inputfield.length > 0) {
                this.setState({ loggedIn: true, focus: null });
                window.setTimeout(
                  () => this.setState({ loggedIn: false, inputfield: "" }),
                  3000
                );
              }
            }}
          >
            Logga in
          </button>
          <button
            onClick={() =>{ 
            const newInputValue=inputfield.length -1;
              this.setState({
                inputfield: inputfield.substring(0, inputfield.length - 1),
                focus: null,
                inputMessage:newInputValue<6 ? false:true
              })
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
