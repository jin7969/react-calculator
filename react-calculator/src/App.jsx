import React, { Component } from 'react';
import './App.css';
import Digits from './components/digits.jsx';
import Operations from './components/operations.jsx';
import { MAX_NUMBER_LENGTH, INDIVISIBLE_NUMBER, RESULT } from './constants.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    operation: '',
    firstNumber: '',
    secondNumber: '',
  };

  handleDigit = (number) => {
    if (this.state.operation) {
      const secondNumberResult = this.state.secondNumber + number;
      this.setState({
        secondNumber:
          this.state.secondNumber.length === MAX_NUMBER_LENGTH
            ? this.state.secondNumber
            : secondNumberResult,
      });
      this.renderCalculatorNumber(secondNumberResult);
      return;
    }

    const firstNumberResult = this.state.firstNumber + number;
    this.setState({
      firstNumber:
        this.state.firstNumber.length === MAX_NUMBER_LENGTH
          ? this.state.firstNumber
          : firstNumberResult,
    });
    this.renderCalculatorNumber(firstNumberResult);
  };

  setOperations = (selectedOperation) => {
    this.setState({ operation: selectedOperation });
  };

  add = () => {
    const result = Number(this.state.firstNumber) + Number(this.state.secondNumber);
    this.renderCalculatorNumber(result);
  };

  minus = () => {
    const result = Number(this.state.firstNumber) - Number(this.state.secondNumber);
    this.renderCalculatorNumber(result);
  };

  divide = () => {
    if (this.state.secondNumber === INDIVISIBLE_NUMBER) {
      this.renderCalculatorNumber(RESULT.ERROR_MESSAGE);
      return;
    }
    const result = Math.floor(Number(this.state.firstNumber) / Number(this.state.secondNumber));
    this.renderCalculatorNumber(result);
  };

  multiply = () => {
    const result = Number(this.state.firstNumber) * Number(this.state.secondNumber);
    this.renderCalculatorNumber(result);
  };

  renderCalculatorNumber = (number) => {
    this.myRef.current.textContent = number;
  };

  handleModifierButtonClick = () => {
    this.renderCalculatorNumber(RESULT.RESET);
    this.setState({
      operation: '',
      firstNumber: '',
      secondNumber: '',
    });
  };

  render() {
    return (
      <div id="app">
        <div className="calculator">
          <h1 id="calculator-number" ref={this.myRef}>
            0
          </h1>
          <Digits handleDigit={this.handleDigit} />
          <div className="modifiers subgrid">
            <button className="modifier" onClick={this.handleModifierButtonClick}>
              AC
            </button>
          </div>
          <Operations
            operation={this.state.operation}
            setOperation={this.setOperations}
            add={this.add}
            minus={this.minus}
            divide={this.divide}
            multiply={this.multiply}
          />
        </div>
      </div>
    );
  }
}

export default App;
