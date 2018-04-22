class Stopwatch extends React.Component {
  constructor(display) {
    // super(display) ?
    super(display);
    this.state = {
      running: false,
      display: display,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.lap = this.lap.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.print = this.print.bind(this);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    if (this.running) {
      this.stop();
    }
    this.print();
  }

  print() {
    this.state.display.innerText = this.format(this.times);
  }
  // po co tyle this?
  format(times) {
    return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  start() {
    if (!this.state.running) {
      this.state.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.state.times.miliseconds += 1;
    if (this.state.times.miliseconds >= 100) {
      this.state.times.seconds += 1;
      this.state.times.miliseconds = 0;
    }
    if (this.state.times.seconds >= 60) {
      this.state.times.minutes += 1;
      this.state.times.seconds = 0;
    }
  }

  stop() {
    this.state.running = false;
    clearInterval(this.watch);
  }

  lap() {
    const resultsList = document.querySelector('.results');
    const resultItem = document.createElement('li');
    resultItem.className = 'result';
    resultsList.appendChild(resultItem);
    resultItem.innerHTML = this.state.display.innerText;
    this.reset();
    this.start();
  }

  resetAll() {
    this.reset();
    if (resultsList.resultItem.length > 0) {
      resultsList.removeChild(resultItem);
    }
  }

  render() {
    return (
      <div className='stoper'>
        <nav className='controls'>
          <a href='#' className='button' id='start' onClick={this.start}>Start</a>
          <a href='#' className='button' id='stop' onClick={this.stop}>Stop</a>
          <a href='#' className='button' id='reset' onClick={this.reset}>Reset</a>
          <a href='#' className='button' id='lap' onClick={this.lap}>Lap</a>
          <a href='#' className='button' id='reset-all' onClick={this.resetAll}>Reset all</a>
        </nav>
        <div className='stopwatch'>{this.print()}</div>
        <ul className='results'></ul>
      </div>
    )
  }

}

ReactDOM.render(
  <Stopwatch />,
  document.getElementById('app')
);