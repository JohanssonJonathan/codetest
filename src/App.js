import React, { Component } from "react";
import Keypad from "./components/keypad/Keypad";
import Design from "./components/design/Design";
import "./App.css";

class App extends Component {
  state = {
    keypad: false,
    design: false
  };

  toggleView = value => {
    this.setState({
      [value]: false
    });
  };

  render() {
    const { keypad, design } = this.state;
    return (
      <>
        {(keypad || design) === false && (
          <div className="choice-container flex-column">
            <h2>Pick the challenge of your choice</h2>
            <div className="flex-row">
              <button
                className="choice-button"
                onClick={() => this.setState({ keypad: true })}
              >
                Keypad
              </button>
              <button
                className="choice-button"
                onClick={() => this.setState({ design: true })}
              >
                Design
              </button>
            </div>
          </div>
        )}

        {keypad && <Keypad toggleView={this.toggleView} />}
        {design && <Design toggleView={this.toggleView} />}
      </>
    );
  }
}

export default App;
