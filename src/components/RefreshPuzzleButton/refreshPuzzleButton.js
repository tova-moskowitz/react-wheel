import React from "react";

class App extends React.Component {
  render() {
    return (
      <button
        className="refreshPuzzleButton"
        onClick={this.handleButtonRefresh}
      >
        Start New Game
      </button>
    );
  }
}
