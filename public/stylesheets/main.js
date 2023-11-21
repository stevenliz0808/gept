const myAnsArray = new Array(30);
const singleAnsArray = new Array(30);

function main() {
  const counterElement = document.querySelector("#countdown");
  const renderList = document.querySelector(".render-list");
  const pageLink = document.querySelector(".page-link");

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
        "看圖辨義：每題有一個圖片，錄音播出一個和該題相關的問題，與A、B、C三個英語敘述後，選一個與所看到圖片最相符的答案。";
      break;

    case "問答":
      topic.innerHTML =
        "問答：錄音會播出一個問句或直述句，聽後請於A、B、C三個選項中，選出一個最適合的回答或回應。 ";
      break;

    case "簡短對話":
      topic.innerHTML =
        "簡短對答：錄音會播出一段對話及一個相關的問題，聽後請於A、B、C三個選項中，選出一個最適合的回答。";
      break;

    case "短文聽解":
      topic.innerHTML =
        "短文聽解：每題有三個圖片選項。請聽錄音播出的題目，並選出一個最適當的圖片。";
      break;
  }

  if (data.imgPath !== "") {
    topic.innerHTML += `<img class="img-topic" src="/Listening/imagesEng/${data.imgPath}.jpg" alt="">`;
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
  singleAnsArray[data.sort - 1] = data.singleAns;
}

main();
