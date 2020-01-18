import React from 'react';
import styles from './components/PuzzleBoard/PuzzleBoard.css';
import phrases from './puzzleBank/phrases.js';


class App extends React.Component  {
  constructor(props) {
  super(props);
  // this.state = {currentPuzzle: }
  }

  preparePuzzle() {
      let puzzle = phrases[Math.floor(Math.random() * phrases.length)];
      puzzle = puzzle.split('');
      return puzzle.map(function(letter, index){
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
      });
    }


  render() {
      return (
      <div className="PuzzleBoard">
        <div className="puzzleBoard">
            {this.preparePuzzle() }
            </div>
            <div>
              <button>Get New Puzzle</button>
            </div>
      </div>
    );
  }
}
export default App;
