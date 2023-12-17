const myAnsArray = new Array();
const myQuesArray = new Array();
const standardAnsArray = new Array();
const checkedAnsArray = new Array();

function main() {
  const counterElement = document.querySelector("#countdown");
  const renderList = document.querySelector(".render-list");
  const pageLink = document.querySelector(".page-link");
  const testReport = document.querySelector(".test-report");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const twzipcode = document.querySelector("#twzipcode");

  if (counterElement) {
    createCounter(counterElement, { initialCount: 1200 });
  }

  if (renderList) {
    renderList.addEventListener("click", (event) => {
      const data = event.target;
      const optionsContainer = document.querySelector(".options-container");
      // 點答案
      if (data.classList.contains("option")) {
        const options = document.querySelectorAll(".option");
        const number = data.name;
        options.forEach((option) => {
          option.classList.remove("chosen-color");
        });
        data.classList.add("chosen-color");

        // 紀錄答案
        myAnsArray[number - 1] = data.value;

        //題碼顯示答案
        const questionNum = document.querySelector(`#question${number}`);
        if (questionNum) {
          const letters = "ABC";
          questionNum.textContent = letters[data.value - 1];
          questionNum.classList.add("chosen-color");
        }

        //更新進度條
        const bar1 = document.querySelector(".bar1");
        const bar2 = document.querySelector(".bar2");
        const bar3 = document.querySelector(".bar3");
        const bar4 = document.querySelector(".bar4");

        if (bar1) {
          if (number <= 5) {
            const finishItemAmount = myAnsArray
              .slice(0, 5)
              .filter((e) => e !== null).length;
            bar1.textContent = finishItemAmount;
            bar1.style.width = finishItemAmount * 20 + "%";
          }
          if (number > 5 || number <= 15) {
            const finishItemAmount = myAnsArray
              .slice(5, 15)
              .filter((e) => e !== null).length;
            bar2.textContent = finishItemAmount;
            bar2.style.width = finishItemAmount * 10 + "%";
          }
          if (number > 15 || number <= 25) {
            const finishItemAmount = myAnsArray
              .slice(15, 25)
              .filter((e) => e !== null).length;
            bar3.textContent = finishItemAmount;
            bar3.style.width = finishItemAmount * 10 + "%";
          }
          if (number > 25 || number <= 30) {
            const finishItemAmount = myAnsArray
              .slice(25, 30)
              .filter((e) => e !== null).length;
            bar4.textContent = finishItemAmount;
            bar4.style.width = finishItemAmount * 20 + "%";
          }
        }
      }
      // 點題號
      if (data.classList.contains("page-link")) {
        const pageItems = document.querySelectorAll(".page-item");
        pageItems.forEach((pageItem) => {
          pageItem.classList.remove("active");
        });
        data.parentNode.classList.add("active");

        //顯示已選答案
        const questionId = Number(data.dataset.questionId);
        const myAns = myAnsArray[questionId - 1];

        if (myAns !== undefined) {
          const option = optionsContainer.querySelector(`:nth-child(${myAns})`);
          option.classList.add("chosen-color");
        }
      }
      //跳下一題
      if (optionsContainer.querySelector(".chosen-color")) {
        const nextQuestion = document.querySelector(".next-question");
        nextQuestion.disabled = false;
      }
    });

    const btnHandout = document.querySelector(".btn-handout");
    const pretest = document.querySelector(".pretest");

    if (btnHandout) {
      btnHandout.addEventListener("click", (event) => {
        if (myAnsArray.filter((e) => e != "").length !== listeningData.length) {
          window.alert("尚未完成作答!");
          return event.preventDefault();
        }
        const myAns = document.querySelector("#myAns");
        const checkedAns = document.querySelector("#checkedAns");
        const level = document.querySelector("#level");
        checkAns();

        myAns.value = myAnsArray.join("");
        checkedAns.value = checkedAnsArray.join("");
        level.value = checkedAnsArray.filter((e) => e.includes("O")).length * 4;
      });
    }

    if (pretest) {
      showPretestContent(questionData[currentIndex - 1]);
    }
  }

  if (pageLink) {
    pageLink.click();
  }

  if (testReport) {
    const d1 = document.querySelector("#level1").textContent * 5;
    const d2 = document.querySelector("#level2").textContent * 2.5;
    const d3 = document.querySelector("#level3").textContent * 2.5;
    const d4 = document.querySelector("#level4").textContent * 5;

    const t1 = document.querySelector("#first-accuracy").textContent;
    const t2 = document.querySelector("#last-accuracy").textContent;
    const t3 = document.querySelector("#this-accuracy").textContent;

    renderCorrectRateChart(d1, d2, d3, d4);
    renderTestComparisonChart(t1, t2, t3);
  }

  if (navbarToggler) {
    $(".navbar-toggler").click(function () {
      $("#user-name").toggle();
    });
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

function showListeningContent(index) {
  const data = listeningData[index - 1];
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

  const optionsContainer = document.querySelector(".options-container");
  if (data.sort !== listeningData.length) {
    optionsContainer.innerHTML += `<button class="btn btn-primary next-question" onclick="nextQuestion(${data.sort})" disabled>下一題</button>`;
  }

  //儲存解答
  standardAnsArray[data.sort - 1] = data.standardAns;
}

function nextQuestion(num) {
  const questionNum = document.querySelector(`#question${num + 1}`);
  questionNum.click();
}

function showPretestContent(data) {
  const pretest = document.querySelector(".pretest");
  pretest.innerHTML = `
      <h3>${currentIndex}.${data.ExamName}</h3>
      <div class="options-container w-100 mt-4">         
        <button class="btn option" name=${currentIndex} value="1">${data.Ans1}</button>
        <button class="btn option" name=${currentIndex} value="2">${data.Ans2}</button>
      </div>`;

  const optionsContainer = pretest.querySelector(".options-Container");
  if (data.Ans3) {
    optionsContainer.innerHTML += `<button class="btn option" name=${currentIndex} value="3">${data.Ans3}</button>`;
  }
  if (data.Ans4) {
    optionsContainer.innerHTML += `<button class="btn option" name=${currentIndex} value="4">${data.Ans4}</button>`;
  }
  optionsContainer.innerHTML += `
  <button class="btn btn-primary next-question" onclick="nextPretestQuestion()" disabled>下一題</button>`;
  //儲存解答
  standardAnsArray[currentIndex - 1] = data.StandardAns;
  //儲存題目ID
  myQuesArray[currentIndex - 1] = data.ID;
}

async function nextPretestQuestion() {
  if (currentIndex === questionData.length) {
    checkAns();
    const accuracy =
      checkedAnsArray.filter((e) => e.includes("O")).length /
      checkedAnsArray.filter((e) => e !== undefined).length;

    if (accuracy < 0.6 && level > 1) {
      loseTimes++;
      if (winTimes > 0 && loseTimes > 0) {
        const ansData = { myAnsArray, myQuesArray, level: level - 1 };
        return axios
          .post("/api/pretest/report", ansData)
          .then((res) => (window.location.href = res.data.redirect))
          .catch((err) => console.error("Error saving data:", err));
      }
      await axios.get(`/api/pretest/${level - 1}`).then((res) => {
        questionData.push(...res.data.pretestData);
        level = res.data.round;
      });
    } else if (accuracy >= 0.6 && level < 10) {
      winTimes++;
      if (winTimes > 0 && loseTimes > 0) {
        const ansData = { myAnsArray, myQuesArray, level: level };
        return axios
          .post("/api/pretest/report", ansData)
          .then((res) => {
            window.location.href = res.data.redirect;
          })
          .catch((err) => console.error("Error saving data:", err));
      }
      await axios.get(`/api/pretest/${level + 1}`).then((res) => {
        questionData.push(...res.data.pretestData);
        level = res.data.round;
      });
    } else {
      const ansData = { myAnsArray, myQuesArray, level };
      return axios
        .post("/api/pretest/report", ansData)
        .then((res) => (window.location.href = res.data.redirect))
        .catch((err) => console.error("Error saving data:", err));
    }
    standardAnsArray.length = 0;
    checkedAnsArray.length = 0;
  }

  currentIndex++;
  const currentQues = questionData[currentIndex - 1];
  showPretestContent(currentQues);
}

function renderCorrectRateChart(d1, d2, d3, d4) {
  const correctRateChart = document.querySelector("#correct-rate-chart");
  Chart.defaults.font.size = 16;
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
          borderWidth: 1, // 外框線寬度
          barThickness: 45,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
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
              borderWidth: 1,
            },
          },
        },
      },
    },
  });
}

function renderTestComparisonChart(d1, d2, d3) {
  const testComparisonChart = document.querySelector("#test-comparison-chart");
  Chart.defaults.font.size = 16;
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
          borderWidth: 1,
          barThickness: 45,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
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
              borderWidth: 1,
            },
          },
        },
        datalabels: {
          color: "#36A2EB",
        },
      },
    },
  });
}

function checkAns() {
  for (let i = 0; i < myAnsArray.length; i++) {
    if (standardAnsArray[i] === undefined) {
      checkedAnsArray[i] === undefined;
    } else if (
      myAnsArray[i] === standardAnsArray[i] &&
      myAnsArray[i] !== undefined
    ) {
      checkedAnsArray[i] = "O";
    } else checkedAnsArray[i] = "X";
  }
}

main();
