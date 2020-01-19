// import styles from './PuzzleBoard.css'
// import React, {Component} from 'react';
// // import RefreshPuzzleButton from '../RefreshPuzzleButton/index.js';
// import phrases from '../../puzzleBank/phrases.js';
// // import {refreshPuzzle} from '../RefreshPuzzleButton/index.js'
//
// class PuzzleBoard extends Component {
//   constructor(props) {
//         super(props);
//         // this.handleRefreshPuzzle = this.handleRefreshPuzzle.bind(this);
//         this.preparePuzzle = this.preparePuzzle.bind(this);
//   }
//
//   // handleRefreshPuzzle() {
//   //     {this.render()}
//   // }
//
//   preparePuzzle() {
//       let puzzle = phrases[Math.floor(Math.random() * phrases.length)];
//       puzzle = puzzle.split('');
//       return puzzle.map(function(letter, index){
//         if(letter !== ' '){
//           return (
//             <div key={index} className="puzzleWrapper">
//               <div className="puzzleLetter">{letter.toUpperCase()}</div>
//             </div>
//           )
//         }
//         else {
//           return(
//             <div key={index}>
//               &nbsp;
//             </div>
//           )
//         }
//       });
//     }
//
// //     render() {
// //         return (
// //             <div className="puzzleBoard">
// //                 {this.preparePuzzle() }
// //             </div>
// //         );
// //     }
// // }
//
// export default PuzzleBoard;
