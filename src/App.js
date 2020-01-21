import React from "react";
import styles from "./components/PuzzleBoard/PuzzleBoard.css";
import phrases from "./puzzleBank/phrases.js";
import categories from "./puzzleBank/categories";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allLetters: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ],
      currentPuzzle: [],
      currentTurnLetter: "",
      allUsedLetters: [],
      allPuzzles: phrases,
      wheelScoreValues: [100, 200, 300, 400, 500, "bankrupt"],
      runningScore: 0,
      costOfVowel: 100,
      specialChars: ["&", "'", "!", "?", ","],
      correctlyGuessedLetters: []
    };
  }

  retrieveNewCategory = () => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return category;
  };

  renderPuzzle = () => {
    return this.state.currentPuzzle.map((letter, index) => {
      if (this.state.correctlyGuessedLetters.indexOf(letter) !== -1) {
        return <span key={index}>{letter}</span>;
      } else if (letter === " ") {
        return <span key={index}>&nbsp;&nbsp;</span>;
      } else {
        return <span key={index}>_ </span>;
      }
    });
  };

  componentWillMount = () => {
    const category = this.retrieveNewCategory();
    const puzzle = phrases[category].toUpperCase().split("");
    this.setState({ currentCategory: category });
    this.setState({ currentPuzzle: puzzle });
  };

  handleButtonRefresh = () => {
    const category = this.retrieveNewCategory();
    const puzzle = phrases[category].toUpperCase().split("");
    this.setState({ currentCategory: category });
    this.setState({ currentPuzzle: puzzle });
  };

  handleInputTurnLetter = e => {
    this.setState({ currentTurnLetter: e.target.value.toUpperCase() });
  };

  handleSetStatecorrectlyGuessedLetters = () => {
    this.state.currentPuzzle.map(letter => {
      if (letter === this.state.currentTurnLetter) {
        this.setState({
          correctlyGuessedLetters: this.state.correctlyGuessedLetters.concat([
            letter
          ])
        });
      }
      return true;
    });
  };

  handleSetStateallUsedLetters = () => {
    this.setState({
      allUsedLetters: this.state.allUsedLetters.concat([
        this.state.currentTurnLetter
      ])
    });
  };

  wrapperOnClick = () => {
    this.handleSetStateallUsedLetters();
    this.handleSetStatecorrectlyGuessedLetters();
  };

  render = () => {
    return (
      <div className="puzzleBoardWrapper">
        <div className="puzzleBoard">
          <div className="puzzleLetter">{this.renderPuzzle()}</div>
          <div className="currentCategory">{this.state.currentCategory}</div>
        </div>
        <div className="scoreWrapper">
          <span id="runningScore">{this.state.runningScore}</span>
        </div>
        <div>
          <button
            className="refreshPuzzleButton"
            onClick={this.handleButtonRefresh}
          >
            Start New Game
          </button>
        </div>
        <label htmlFor="pickALetter">Enter a Letter</label>
        <input
          maxLength="1"
          onChange={this.handleInputTurnLetter}
          type="text"
          placeholder="a, b, c, etc."
        ></input>
        <button onClick={this.wrapperOnClick}>
          I'll take the {this.state.currentTurnLetter}
        </button>
      </div>
    );
  };
}
export default App;
