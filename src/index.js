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
    const winner = calculateWinner(this.state.squares); //check if a player has won
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' :'O');
    }
  }
}

class Game extends React.Component { //parent class to Board
  constructor(props){
    super(props);
    this.state={
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i){
    //we concatenate new history entries onto history.
    const history = this.state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }])
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = calculateWinner(current.squares);
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
