import React from "react";
import styles from "./components/PuzzleBoard/PuzzleBoard.css";
import phrases from "./puzzleBank/phrases.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wheelScoreValues: [
        400,
        450,
        500,
        550,
        600,
        650,
        700,
        750,
        800,
        850,
        900,
        950,
        1000,
        2500,
        3500,
        5000,
        "bankrupt"
      ],
      vowels: ["a", "e", "i", "o", "u"],
      specialChars: ["&", "'", "!", "?", ","],

      currentPuzzle: [],
      allUsedLetters: [],
      currentTurnLetter: "",
      runningScore: 0,
      costOfVowel: 100,
      correctlyGuessedLetters: [],
      wheelSpinValue: 0,
      correctLetterCount: 0
    };
  }

  retrieveNewCategory = () => {
    const categories = Object.keys(phrases);
    const category = categories[Math.floor(Math.random() * categories.length)];
    this.setState({ currentCategory: category });
    const puzzle =
      phrases[category][Math.floor(Math.random() * phrases[category].length)];
    return puzzle;
  };

  //Figure out why this is not working - Jan 21, 2019
  getDollarAmountPerTurn = () => {
    const score = this.state.wheelScoreValues[
      Math.floor(Math.random() * this.state.wheelScoreValues.length)
    ];
    this.setState({ currentScoreValue: score });
    if (score === "bankrupt") {
      this.setState({ runningScore: 0 });
    }
  };

  renderPuzzle = () => {
    return this.state.currentPuzzle.map((letter, index) => {
      if (
        this.state.correctlyGuessedLetters.indexOf(letter) !== -1 ||
        this.state.specialChars.indexOf(letter) !== -1
      ) {
        return <span key={index}>{letter}</span>;
      } else if (letter === " ") {
        return <span key={index}>&nbsp;&nbsp;&nbsp;</span>;
      } else {
        return <span key={index}>___ </span>;
      }
    });
  };

  UNSAFE_componentWillMount = () => {
    const puzzle = this.retrieveNewCategory()
      .toUpperCase()
      .split("");
    this.setState({ currentPuzzle: puzzle });
    this.getDollarAmountPerTurn();
  };

  handleButtonRefresh = () => {
    const puzzle = this.retrieveNewCategory()
      .toUpperCase()
      .split("");
    this.setState({ currentPuzzle: puzzle });
    this.setState({ correctlyGuessedLetters: [] });
    this.setState({ allUsedLetters: [] });
    this.setState({ runningScore: 0 });
    this.setState({ correctLetterCount: 0 });
    this.getDollarAmountPerTurn();
  };

  handleInputTurnLetter = e => {
    let count = 0;
    this.state.currentPuzzle.map(letter => {
      if (e.target.value.toUpperCase() === letter) {
        count++;
      }
    });

    this.setState({ correctLetterCount: count });
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
    if (
      this.state.allUsedLetters.indexOf(
        this.state.currentTurnLetter.toUpperCase()
      ) !== -1
    ) {
      this.setState({
        correctlyGuessedLetters: this.state.correctlyGuessedLetters
      });
    }
  };

  handleSetStateAllUsedLetters = () => {
    if (
      this.state.allUsedLetters.indexOf(
        this.state.currentTurnLetter.toUpperCase()
      ) !== -1
    ) {
      this.setState({ allUsedLetters: this.state.allUsedLetters });
    } else {
      this.setState({
        allUsedLetters: this.state.allUsedLetters.concat([
          this.state.currentTurnLetter
        ])
      });
    }
  };

  wrapperGuessLetterOnClick = () => {
    this.handleSetStateAllUsedLetters();
    this.handleSetStatecorrectlyGuessedLetters();
    this.getDollarAmountPerTurn();
    this.updateRunningScore();
  };

  updateRunningScore = () => {
    return this.state.currentPuzzle.map((letter, index) => {
      if (
        this.state.currentTurnLetter === letter &&
        this.state.allUsedLetters.indexOf(letter) === -1
      ) {
        this.setState({
          runningScore:
            this.state.runningScore +
            this.state.wheelSpinValue * this.state.correctLetterCount
        });
      } else {
        return this.state.runningScore;
      }
    });
  };

  updateScoreForVowels = () => {};

  render = () => {
    return (
      <div className="puzzleBoardWrapper">
        <div className="puzzleBoard">
          {/* {/* <div className="puzzleLetter"> */}
          {this.renderPuzzle()}
        </div>
        <div className="currentCategory">{this.state.currentCategory}</div>
        {/* </div> */}
        <div className="scoreWrapper">
          <span className="runningScore">{this.state.runningScore}</span>
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
        ></input>
        <button onClick={this.wrapperGuessLetterOnClick}>
          I'll take the {this.state.currentTurnLetter}
        </button>
      </div>
    );
  };
}
export default App;
