import React from 'react';
import styles from './components/PuzzleBoard/PuzzleBoard.css';
import phrases from './puzzleBank/phrases.js';


class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      allLetters:
        ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      currentPuzzle: [],
      currentTurnLetter: null,
      lettersUsed: [],
      allPuzzles: phrases,
               wheelScoreValues: [100, 200, 300, 400, 500, 'bankrupt'],
      runningScore : 0,
      costOfVowel: 100,
    };
  }

    retrieveNewPuzzle = () => {
      let puzzle = phrases[Math.floor(Math.random() * phrases.length)];
      return puzzle.split('');
    }

    componentWillMount = () => {
      const puzzle = this.retrieveNewPuzzle();
      this.setState({currentPuzzle : puzzle});
    }

    handleButtonRefresh = () => {
      const puzzle = this.retrieveNewPuzzle();
      this.setState({currentPuzzle : puzzle});
    }

  render = () => {
    let puzzle = this.state.currentPuzzle;
    //render puzzle spaces with ? showing for each space

    //set score to 0
      return (
      <div className="puzzleBoardWrapper">
        <div className="puzzleBoard">
            {puzzle.map(function(letter, index){
              if(letter !== ' '){
                return (
                  <div key={index} className="puzzleWrapper">
                    <div className="puzzleLetter">{letter.toUpperCase()}</div>
                  </div>
                )
              }
              else {
                return(
                  <div key={index}>
                    &nbsp;
                  </div>
                )
              }
            }) }
        </div>
            <div className="runningScore"></div>
            <div>
              <button onClick={this.handleButtonRefresh}>Start New Game</button>
            </div>
      </div>
    );
  }
}
export default App;
