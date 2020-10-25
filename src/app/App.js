import React from 'react';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      winX: 0,
      winO: 0,
      draw: 0,
      disabled: false,
      checkDraw: 8
    }
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

  }

  // Вывод победителя
  isWinner = () => {
    let s = (this.state.count % 2 === 0) ? 'X' : 'O';
    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];
      if (this.state.squares[line[0]] === s && this.state.squares[line[1]] === s && this.state.squares[line[2]] === s) {
        // s === 'X' ? this.setState( {winX: this.state.winX + 1} ) : this.setState( {winO: this.state.winO + 1} )
        if (s === 'X') {
          this.setState( {winX: this.state.winX + 1} )
        } else {
          this.setState( {winO: this.state.winO + 1} )
        }
        alert(s + ' win');
        this.clearField();
        return
      }

    }
    // Проверка на ничью
    if ( this.state.count === this.state.checkDraw ) {
      alert('Draw');
      this.setState( {draw: this.state.draw + 1} )
      this.clearField();
    }

  }
  // Первый символ
  selectSymbol = (event) => {
    // console.log(event.target.getAttribute('data'))
    if (event.target.getAttribute('data') === 'X') {
      this.setState( {count: 0} )
      this.setState( {checkDraw: 8} )
    } else {
      this.setState( {count: 1} )
      this.setState( {checkDraw: 9} )
    }
  }

  // Новая игра
  resetGame = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ count: 0 });
    this.setState( {checkDraw: 8} )
    this.setState( {disabled: false} )
  }

  // Очистка поля
  clearField = () => {
    setTimeout( () => {
      this.setState({ squares: Array(9).fill(null) });
      this.setState({ count: 0 });
      this.setState( {checkDraw: 8} )
      this.setState( {disabled: false} )
    }, 2000 )
  }

  // Заполнение поля
  clickHandler = (event) => {
    let data = event.target.getAttribute('data');
    let currentSquare = this.state.squares;
    // console.log(currentSquare)
    if (currentSquare[data] === null) {
      currentSquare[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
      this.setState({ count: this.state.count + 1 });
      this.setState({ squares: currentSquare });
    } else {
      alert('Поле занято');
    }
    this.isWinner();
    this.setState( {disabled: true} )
  }

  render() {
    return (
      <div className="game__wrap" >
        {this.state.winX !== 0 && <span>X winner - {this.state.winX} </span>}
        {this.state.winO !== 0 && <span>O winner - {this.state.winO} </span>}
        {this.state.draw !== 0 && <span>Draw - {this.state.draw} </span>}
        <div>
          <p>Выберите символ</p>
          <div>
            <button onClick={this.selectSymbol}  data="X" disabled={this.state.disabled}>X</button>
            <button onClick={this.selectSymbol}  data="O" disabled={this.state.disabled}>O</button>
          </div>
        </div>
        <div className="game" >
          <div className="grid" onClick={this.clickHandler} data="0" > {this.state.squares[0]} </div>
          <div className="grid" onClick={this.clickHandler} data="1" > {this.state.squares[1]} </div>
          <div className="grid" onClick={this.clickHandler} data="2" > {this.state.squares[2]} </div>
          <div className="grid" onClick={this.clickHandler} data="3" > {this.state.squares[3]} </div>
          <div className="grid" onClick={this.clickHandler} data="4" > {this.state.squares[4]} </div>
          <div className="grid" onClick={this.clickHandler} data="5" > {this.state.squares[5]} </div>
          <div className="grid" onClick={this.clickHandler} data="6" > {this.state.squares[6]} </div>
          <div className="grid" onClick={this.clickHandler} data="7" > {this.state.squares[7]} </div>
          <div className="grid" onClick={this.clickHandler} data="8" > {this.state.squares[8]} </div>
        </div>
        <div>
          <button onClick={this.resetGame} >New Game</button>
        </div>
      </div>
    )
  }
}

export default App;
