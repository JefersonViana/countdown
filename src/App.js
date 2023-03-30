import React from 'react';
import './App.css';
import logo from './image/logo-negative-green.svg';
import audio from './audio/music4.mp3';
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      isDisabledBtn: false,
      pauseTime: false,
      pausarOuRetomar: true,
      sound: false,
      totalSeconds: 0,
      didUp: false,
    };
  }
  changeState = (hours = 0, minutes = 0, seconds = 0) => {
    this.setState({
      totalSeconds: hours + minutes + seconds,
      pauseTime: true,
      input: '',
      isDisabledBtn: true,
      sound: false,
    })
    this.timeInitializer(hours + minutes + seconds);
  }
  handleClick = () => {
    const { input, totalSeconds } = this.state;
    if (input.length === 0 && totalSeconds === 0) {
      alert('Formato aceito: HH:MM:SS, MM:SS ou SS')
      this.setState({
      input: '',
      totalSeconds: 0,
      })
      return;
    }
    const inputNumber = input.split(':');
    if (inputNumber.length === 1) {
      this.changeState(Number(inputNumber[0]));
      return;
    }
    if (inputNumber.length === 2) {
      this.changeState(Number(inputNumber[0] * 60), Number(inputNumber[1]));
      return;
    }
    this.changeState(Number(inputNumber[0] * 3600), Number(inputNumber[1] * 60), Number(inputNumber[2]));
  };

  handleChange = ({ target }) => {
    target.value = target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1:$2")
      .replace(/(:\d{2})(\d)/, "$1:$2")
      .replace(/(:\d{2})\d+?$/, "$1");
    this.setState({
      input: target.value
    })
  };

  formatTime = (time) => {
    const hour = Math.floor(Number(time) / 3600)
    const minutes = Math.floor((Number(time) % 3600) / 60)
    const seconds = Math.floor((Number(time) % 3600) % 60)
    return (`${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
  };

  paused = (stop) => {
    clearInterval(this.interval);
    const { totalSeconds } = this.state;
    this.setState({
      pauseTime: !stop,
      pausarOuRetomar: !stop,
    })
    if (!stop) {
      this.timeInitializer(totalSeconds);
    }
  };

  zerar = () => {
    clearInterval(this.interval);
    this.setState({
      totalSeconds: 0,
      pauseTime: false,
      isDisabledBtn: false,
      pausarOuRetomar: true,
      input: '',
      didUp: false,
    })
  };

  timeInitializer(secondsTime) {
    clearInterval(this.interval);
    if (secondsTime > 0) {
      this.interval = setInterval(() => {
        this.setState((prevState) => ({
          totalSeconds: prevState.totalSeconds - 1,
          didUp: true,
        }));
      }, 1000)
      return;
    }
  }

  addTime = (quantTime) => {
    this.setState((prevState) => ({
      totalSeconds: prevState.totalSeconds + quantTime,
    }))
    const { totalSeconds } = this.state;
    this.changeState(quantTime + totalSeconds || totalSeconds);
  };

  componentDidUpdate() {
    const { totalSeconds, didUp } = this.state;
    if (didUp && totalSeconds === 0) {
      clearInterval(this.interval);
      this.setState({
        input: '',
        totalSeconds: 0,
        pauseTime: false,
        pausarOuRetomar: true,
        isDisabledBtn: false,
        sound: true,
        didUp: false,
      });
    }
  }
  render() {
    const { input, totalSeconds, pauseTime, pausarOuRetomar, isDisabledBtn, sound } = this.state;
    return (
      <div id="box">
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <p id="paragraph">{ this.formatTime(totalSeconds) }</p>
        <input
          id="input"
          type="text"
          value={ input }
          placeholder="''HH:MM:SS'', ''MM:SS'' ou ''SS''"
          onChange={ this.handleChange }
          onKeyUp={ (event) => {
            if (event.key === 'Enter') {
              this.handleClick()
              };
            }
          }
        >
        </input>
        <div>
          <button
            type="button"
            onClick={ () => this.addTime(3600) }
            className="btnAddTime"
          >
            +1H
          </button>
          <button
            type="button"
            onClick={ () => this.addTime(60) }
            className="btnAddTime"
          >
            +1M
          </button>
          <button
            type="button"
            onClick={ () => this.addTime(30) }
            className="btnAddTime"
          >
            +30S
          </button>
        </div>
        <div id="buttons-box">
          <button
            className={ isDisabledBtn ? 'button' : 'button-enable' }
            disabled={ isDisabledBtn }
            type="button"
            onClick={ () => this.handleClick() }
          >
            Iniciar
          </button>
          <button
            className={ isDisabledBtn ? 'button-paused' : 'button' }
            disabled={ !isDisabledBtn }
            type="button"
            onClick={ () => this.paused(pauseTime) }
          >
            { pausarOuRetomar ? 'Pausar' : 'Retomar'}
          </button>
          <button
            className={ isDisabledBtn ? 'button-enable' : 'button' }
            disabled={ !isDisabledBtn }
            type="button"
            onClick={ this.zerar }
          >
            Zerar
          </button>
        </div>
        { sound && <audio src={ audio } autoPlay /> }
          <img src={ logo } alt="logo-trybe" id="trybe" />
      </div>
    );
  }
}

export default App;
