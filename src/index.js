import React from 'react';
import ReactDOM from 'react-dom';
import { unstable_concurrentAct } from 'react-dom/cjs/react-dom-test-utils.development';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value} 
    </button>
  );
}
class Board extends React.Component {//parent class to Square
  renderSquare(i) {
    return <Square 
      value={this.props.squares[i]} //receives 'squares' & 'onClick' props from Game componenet
      onClick= {()=> this.props.onClick(i)} //pass the location of each Square into the onClick handler to indicate which Square was clicked
     />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component { //parent class to Board
  constructor(props){
    super(props);
    this.state={
      history: [{
        squares: Array(9).fill(null),
      }],
      stateNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i){
    //we concatenate new history entries onto history.
    const history = this.state.history.slice(0, this.state.stepNumber+ 1); //This ensures that if we “go back in time” and then make a new move from that point, we throw away all the “future” history that would now become incorrect.
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length, //ensures we dont get stuck showing the same number after a new move has been made
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step, //updates stepNumer
      xIsNext: (step % 2) === 0, //set xIsNext to true if the number that we’re changing stepNumber to is even
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; //rendering the last move to rendering the currently selected move according to stepNumber
    const winner = calculateWinner(current.squares);

    const moves =history.map((step, move)=> {//each past move has a unique ID associated with it: it’s the sequential number of the move. For each move in the tic-tac-toe game’s history,
      const desc = move ?
        'Go to move # ' + move :
        'Go to game start';
      return(//we create a list item <li> which contains a button <button>. The button has a onClick handler which calls a method called this.jumpTo()
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if(winner){
      status = 'Winner ' + winner;
    }else{
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.square}
            onClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) { //given array of 9 squares,function will check for winner and return 'x', 'o', 'null'
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
