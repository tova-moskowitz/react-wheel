import React from "react";
import styles from "./components/PuzzleBoard/PuzzleBoard.css";
import phrases from "./puzzleBank/phrases.js";
import PuzzleBoard from "./components/PuzzleBoard/puzzleBoard";

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

  getRandom = fromArray =>
    fromArray[Math.floor(Math.random() * fromArray.length)];

  returnCategoryAndPuzzle = () => {
    /**
     * phrases: {
     *  'things': ['apple', 'my hat']
     * }
     */

    const category = this.getRandom(Object.keys(phrases)); // 'things'
    const puzzle = this.getRandom(phrases[category])
      .toUpperCase()
      .split(""); // ['a','p','p','l',e']

    return {
      category,
      puzzle
    };
  };

  getDollarAmountPerTurn = () => {
    const spin = this.getRandom(this.state.wheelScoreValues);
    return spin === "bankrupt" ? 0 : spin;
  };

  UNSAFE_componentWillMount = () => {
    const puzzleData = this.returnCategoryAndPuzzle();
    const wheelSpinValue = this.getDollarAmountPerTurn();

    this.setState({
      currentPuzzle: puzzleData.puzzle,
      currentCategory: puzzleData.category,
      wheelSpinValue
    });
  };

  handleButtonRefresh = () => {
    const puzzleData = this.returnCategoryAndPuzzle();

    this.setState({
      currentPuzzle: puzzleData.puzzle,
      currentCategory: puzzleData.category
    });

    this.setState({ correctlyGuessedLetters: [] });
    this.setState({ allUsedLetters: [] });
    this.setState({ runningScore: 0 });
    this.setState({ correctLetterCount: 0 });
    this.setState({ wheelSpinValue: this.getDollarAmountPerTurn() });
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

    this.updateRunningScore();

    this.setState({
      wheelSpinValue: this.getDollarAmountPerTurn()
    });
  };

  updateRunningScore = () => {
    let count = 0;

    this.state.currentPuzzle.map(letter => {
      if (this.state.currentTurnLetter === letter) {
        count++;
      }
    });

    return this.state.currentPuzzle.map((letter, index) => {
      if (
        this.state.currentTurnLetter === letter &&
        this.state.allUsedLetters.indexOf(letter) === -1
      ) {
        this.setState({
          runningScore:
            this.state.runningScore + this.state.wheelSpinValue * count
        });
      } else {
        return this.state.runningScore;
      }
    });
  };

  updateScoreForVowels = () => {};
  render = () => {
    const { currentPuzzle, correctlyGuessedLetters, specialChars } = this.state;
    return (
      <div className="puzzleBoardWrapper">
        <PuzzleBoard
          puzzle={currentPuzzle}
          correctlyGuessedLetters={correctlyGuessedLetters}
          specialChars={specialChars}
        />
        <div className="currentCategory">{this.state.currentCategory}</div>
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
