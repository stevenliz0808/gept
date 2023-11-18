function main() {
  const counterElement = document.querySelector("#countdown");
  createCounter(counterElement, { initialCount: 1200 });
}

// 倒數計時器
function createCounter(element, options = {}) {
  const { initialCount = 60, interval = 1000 } = options;

  let counter = 0;
  let timer;

  const setCounter = (count) => {
    counter = count;
    render();
  };

  const render = () => {
    const mins = Math.floor(counter / 60);
    const formatMins = mins < 10 ? `0${mins}` : mins;
    const seconds = counter % 60;
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    element.innerHTML = `${formatMins} : ${formatSeconds}`;
  };

  setCounter(initialCount);
  timer = setInterval(() => {
    if (counter <= 0) {
      return clearInterval(timer);
    }
    setCounter(counter - 1);
  }, interval);
}

main();
