class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      savedTimes: []
    };
    this.start = this.start.bind(this);
  }

  reset() {
    this.setState ({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  // po co tyle this?
  format(time) {
    return (`${pad0(time.minutes)}:${pad0(time.seconds)}:${pad0(Math.floor(time.miliseconds))}`);
  }

  start() {
    if (!this.state.running) {
      this.setState ({
        running: true
      });
      // this jest Stopwatch, pozwala na odwoływanie się do niego w innych metodach, coś jak zmienna
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) {
      // wyjście z funkcji jeśli stoper nie działa
      return;
    }
    this.calculate();
    this.format();
  }

  calculate() {
    const times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }
    this.setState({
      // równe times: times
      times
    });
  }

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }

  lap() {
    const savedTimes = this.state.savedTimes;
    savedTimes.push(this.state.times);
    this.setState({
      savedTimes
    });
    this.reset();
  }

  resetAll() {
    this.reset();
    const resetAllResultsList = document.querySelector('.results');
    resetAllResultsList.innerHTML = '';
  }

  render() {
    return (
      <div className='stoper'>
        <nav className='controls'>
          <button className='button' id='start' onClick={() => this.start}>Start</button>
          <a href='#' className='button' id='stop' onClick={() => this.stop}>Stop</a>
          <a href='#' className='button' id='reset' onClick={() => this.reset}>Reset</a>
          <a href='#' className='button' id='lap' onClick={() => this.lap}>Lap</a>
          <a href='#' className='button' id='reset-all' onClick={() => this.resetAll}>Reset all</a>
        </nav>
        <div className='stopwatch'>{this.format(this.state.times)}</div>
        <ul className='results'>
          {this.state.savedTimes.map((time, index) => <li key={index}>{this.format(time)}</li>)}
        </ul>
      </div>
    )
  }

}

// funkcja statyczna - nie korzysta z zewn źródeł, przyjmuje i zwraca, nie korzysta z innych properties i metod wewn klasy Stopwatch
const pad0 = (value) => {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

ReactDOM.render(
  <Stopwatch />,
  document.getElementById('app')
);