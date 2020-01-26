import React from "react";

class RefreshPuzzleButton extends React.Component {
  render() {
    return (
      <button
        className="refreshPuzzleButton"
        onClick={this.props.refreshButton}
      >
        Start New Game
      </button>
    );
  }
}

export default RefreshPuzzleButton;
