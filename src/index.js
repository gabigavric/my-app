import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {//child class to Board parent class
  constructor(props){
    super(props); //in js classes, always call super when defining the constructor of a subclass. All React componenet classes that have a constructor should start with super(props) call.
    this.state={ //this.state is considered private
      value: null,
    };
  }

  render() {//by calling this.setState from an onClick handler in render method, we tell React to re-render that square whenever its <button> is clicked.
    return (//after the update, the Square's this.state.value will be a capital X that will show on the board
      <button className="square"  
      onClick={ ()=> this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {//parent class
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
