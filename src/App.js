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
      lettersUsed: [],
      allPuzzles: phrases,
      wheelScoreValues: [100, 200, 300, 400, 500, "bankrupt"],
      runningScore: 0,
      costOfVowel: 100,
      specialChars: ["&", "'", "!", "?", ","],
      lettersInPuzzle: []
    };
  }

  retrieveNewCategory = () => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return category;
  };

  componentWillMount = () => {
    const category = this.retrieveNewCategory();
    const puzzle = phrases[category].toUpperCase().split("");
    this.setState({ currentCategory: category });
    this.setState({ currentPuzzle: puzzle });
    console.log(puzzle.join(""));
  };

  handleButtonRefresh = () => {
    const category = this.retrieveNewCategory();
    const puzzle = phrases[category].toUpperCase().split("");
    this.setState({ currentCategory: category });
    this.setState({ currentPuzzle: puzzle });
    console.log(puzzle.join(""));
  };

  handleInputTurnLetter = e => {
    this.setState({ currentTurnLetter: e.target.value.toUpperCase() });
  };

  revealInitialPuzzle = () => {
    return this.state.currentPuzzle.map(function(val, ind) {
      return "?";
    });
  };

  handleRevealCorrectLetter = () => {
    // const currentTurnLetter = this.state.currentTurnLetter;
  };

  persistCorrectLetters = () => {
    console.log(this.state.lettersUsed);

    // return this.state.lettersUsed.map(function(letter, ind) {
    // if (this.state.lettersUsed.indexOf(letter) !== -1) {
    // }
    // return letter;
    // });
    //if this.state.lettersUsed.indexOf(letter) !== -1
  };

  render = () => {
    return (
      <div className="puzzleBoardWrapper">
        <div className="puzzleBoard">
          <div className="puzzleLetter">{this.revealInitialPuzzle()}</div>
          <div className="currentCategory">{this.state.currentCategory}</div>
          {this.persistCorrectLetters()}
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
        <button
          onClick={() =>
            this.setState({
              lettersUsed: this.state.lettersUsed.concat([
                this.state.currentTurnLetter
              ])
            })
          }
        >
          Call out {this.state.currentTurnLetter}{" "}
        </button>
      </div>
    );
  };
}
export default App;
