import React from "react";

class PuzzleBoard extends React.Component {
  static defaultProps = {
    puzzle: [],
    correctlyGuessedLetters: [],
    specialChars: []
  };

  renderPuzzle = () => {
    const { puzzle, correctlyGuessedLetters, specialChars } = this.props;
    return puzzle.map((letter, index) => {
      if (
        // correctly guessed letters
        correctlyGuessedLetters.indexOf(letter) !== -1 ||
        specialChars.indexOf(letter) !== -1
      ) {
        return <span key={index}>{letter}</span>;
      } else if (letter === " ") {
        return <span key={index}>&nbsp;&nbsp;&nbsp;</span>;
      } else {
        // unguessed letters
        return <span key={index}>__ </span>;
      }
    });
  };

  render() {
    return <div className="puzzleBoard">{this.renderPuzzle()}</div>;
  }
}

export default PuzzleBoard;
