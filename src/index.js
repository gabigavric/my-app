import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {//child class to Board parent class
  render() { //we have passed two props from Board to Square, value and onClick
    return (
      <button className="square"  
        onClick={ ()=> this.props.onClick()} //When button clicked, React will call onClick event handler that is defined in Squares render() method
                                            //This event handler calls this.props.onClick(). The Square's onClick prop was specified by the Board.
                                        //Since the Board passed onClick={()=>this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked
      >
        {this.props.value} 
      </button>
    );
  }
}

class Board extends React.Component {//parent class to Square
  constructor(props){
    super(props);
    this.state={ //sets Boards initials state to contain array of 9 nulls correspononding to the 9 squares
      squares: Array(9).fill(null), 
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); //creates copy of squares to modify instead of modifying existing array
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]} //each square will now recieve a value prop / Modified Board to instruct each individual Square about its current value
      onClick= {()=> this.handleClick(i)} //passes down function from Board to Square, Square then calls that funciton when a square is clicked.
     />;
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
