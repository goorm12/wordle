const answer = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content: center; align-items : center; position : absolute; top : 50%; left : 50%; transform: translate(-50%,-50%); background-color: white; width: 200px; height :100px;";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts = attempts + 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let numberOfCorrectAnswers = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.boardBlock[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const answer_letter = answer[i];
      if (letter === answer_letter) {
        numberOfCorrectAnswers = numberOfCorrectAnswers + 1;
        block.style.background = "#6aaa64";
      } else if (answer.includes(letter)) {
        block.style.background = "#c9b458";
      } else {
        block.style.background = "#787c7e";
      }
      block.style.color = "#eee";
      block.style.fontSize = "25px";
    }

    if (numberOfCorrectAnswers === 5) {
      gameOver();
    } else {
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.boardBlock[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) {
      index = index - 1;
    }
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.boardBlock[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index = index + 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const nowTime = new Date();
      const elapsedTime = new Date(nowTime - startTime);
      const minute = elapsedTime.getMinutes().toString().padStart(2, "0");
      const second = elapsedTime.getSeconds().toString().padStart(2, "0");

      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${minute}: ${second}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
