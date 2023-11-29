const myAnsArray = new Array(30);
const standardAnsArray = new Array(30);
const checkedAnsArray = new Array(30);

function main() {
  const counterElement = document.querySelector("#countdown");
  const renderList = document.querySelector(".render-list");
  const pageLink = document.querySelector(".page-link");
  const testReport = document.querySelector(".test-report");

  if (counterElement) {
    createCounter(counterElement, { initialCount: 1200 });
  }

  if (pageLink) {
    pageLink.click();
    pageLink.parentNode.classList.add("active");
  }

  if (renderList) {
    renderList.addEventListener("click", (event) => {
      const data = event.target;
      // 點答案
      if (data.classList.contains("option")) {
        const options = document.querySelectorAll(".option");
        options.forEach((option) => {
          option.classList.remove("option-color");
        });
        data.classList.add("option-color");

        // 紀錄答案
        myAnsArray[data.name - 1] = data.value;
      }
      // 點題號
      if (data.classList.contains("page-link")) {
        const pageItems = document.querySelectorAll(".page-item");
        pageItems.forEach((pageItem) => {
          pageItem.classList.remove("active");
        });
        data.parentNode.classList.add("active");
      }
    });

    const btnHandout = document.querySelector(".btn-handout");

    btnHandout.addEventListener("click", (event) => {
      // if (myAnsArray.includes()) {
      //   window.alert("尚未完成作答!");
      //   return event.preventDefault();
      // }
      const myAns = document.querySelector("#myAns");
      const checkedAns = document.querySelector("#checkedAns");
      const level = document.querySelector("#level");
      checkAns();

      myAns.value = myAnsArray.join("");
      checkedAns.value = checkedAnsArray.join("");
      level.value = checkedAnsArray.filter((e) => e.includes("O")).length * 4;
    });
  }

  if (testReport) {
    const d1 = document.querySelector("#level1").textContent *5
    const d2 = document.querySelector("#level2").textContent * 2.5;
    const d3 = document.querySelector("#level3").textContent * 2.5;
    const d4 = document.querySelector("#level4").textContent * 5;
    
    renderCorrectRateChart(d1,d2,d3,d4);
    renderTestComparisonChart(50,60,90);
  }
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
// 出題
function showContent(data) {
  const topic = document.querySelector(".topic");
  const answer = document.querySelector(".answer");

  switch (data.type) {
    case "看圖辨義":
      topic.innerHTML =
        "<p>看圖辨義：每題有一個圖片，錄音播出一個和該題相關的問題，與A、B、C三個英語敘述後，選一個與所看到圖片最相符的答案。</p>";
      break;

    case "問答":
      topic.innerHTML =
        "<p>問答：錄音會播出一個問句或直述句，聽後請於A、B、C三個選項中，選出一個最適合的回答或回應。</p> ";
      break;

    case "簡短對話":
      topic.innerHTML =
        "<p>簡短對答：錄音會播出一段對話及一個相關的問題，聽後請於A、B、C三個選項中，選出一個最適合的回答。</p>";
      break;

    case "短文聽解":
      topic.innerHTML =
        "<p>短文聽解：每題有三個圖片選項。請聽錄音播出的題目，並選出一個最適當的圖片。</p>";
      break;
  }

  if (data.imgPath !== "") {
    topic.innerHTML += `<div class="img-topic"><img src="/Listening/imagesEng/${data.imgPath}.jpg" alt=""></div>`;
  }

  answer.innerHTML = `<p>Question ${data.sort}</p>
        <audio controls>
          <source src="/Listening/voice/Round${data.GEPTround}/${data.voicePath}.mp3" type="audio/mp3">
          Your browser does not support the audio tag.
        </audio>`;

  if (["看圖辨義", "短文聽解"].includes(data.type)) {
    answer.innerHTML += `<div class="options-container">         
          <button class="btn option" name=${data.sort} value="1">A</button>
          <button class="btn option" name=${data.sort} value="2">B</button>
          <button class="btn option" name=${data.sort} value="3">C</button>
        </div>`;
  } else {
    answer.innerHTML += `<div class="options-container">         
          <button class="btn option" name=${data.sort} value="1">${data.ans1}</button>
          <button class="btn option" name=${data.sort} value="2">${data.ans2}</button>
          <button class="btn option" name=${data.sort} value="3">${data.ans3}</button>
        </div>`;
  }

  //儲存解答
  standardAnsArray[data.sort - 1] = data.standardAns;
}

function renderCorrectRateChart(d1,d2,d3,d4) {
  const correctRateChart = document.querySelector("#correct-rate-chart");
  Chart.defaults.font.size = 20;
  const chart = new Chart(correctRateChart, {
    type: "bar",
    data: {
      labels: ["看圖辨義", "問答", "簡短對話", "短文聽解"],
      datasets: [
        {
          label: "正確率",
          data: [d1, d2, d3, d4],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", // 第一個 bar 顏色
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)", // 第一個 bar 外框線顏色
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 2, // 外框線寬度
          barThickness: 50,
        },
      ],
    },
    options: {
      scales: {
        y: {
          type: "linear",
          position: "bottom",
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
          },
        },
        x: {},
      },
      plugins: {
        annotation: {
          annotations: {
            line1: {
              type: "line",
              yMin: 60,
              yMax: 60,
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 2,
            },
          },
        },
      },
    },
  });
}

function renderTestComparisonChart(d1, d2, d3) {
  const testComparisonChart = document.querySelector("#test-comparison-chart");
  Chart.defaults.font.size = 20;
  const chart = new Chart(testComparisonChart, {
    type: "bar",
    data: {
      labels: ["首次測驗", "上次測驗", "本次測驗"],
      datasets: [
        {
          label: "正確率",
          data: [d1, d2, d3],
          backgroundColor: [
            "rgba(102, 51, 153, 0.2)",
            "rgba(255, 153, 0 ,0.2)",
            "rgba(0, 153, 102, 0.2)",
          ],
          borderColor: [
            "rgba(102, 51, 153, 1)",
            "rgba(255, 153, 0 ,1)",
            "rgba(0, 153, 102, 1)",
          ],
          borderWidth: 2,
          barThickness: 50,
        },
      ],
    },
    options: {
      scales: {
        y: {
          type: "linear",
          position: "bottom",
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
          },
        },
        x: {},
      },
      plugins: {
        annotation: {
          annotations: {
            line1: {
              type: "line",
              yMin: 60,
              yMax: 60,
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 2,
            },
          },
        },
      },
    },
  });
}

function checkAns() {
  for (let i = 0; i < myAnsArray.length; i++) {
    if (myAnsArray[i] === standardAnsArray[i]) {
      checkedAnsArray[i] = "O";
    } else checkedAnsArray[i] = "X";
  }
}

main();
