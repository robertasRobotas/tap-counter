const userNameInput = document.getElementById("user-name");
const startBtn = document.getElementById("start-btn");
const contentComponent = document.getElementById("content");

const counter = document.createElement("div");
counter.classList.add("count");

const tapper = document.createElement("button");
tapper.classList.add("tapper");
tapper.innerHTML = "tap";

const timer = document.createElement("div");
timer.classList.add("timer");

let userName;
let count = 0;
let timeLeft = 5;

const updateCount = () => {
  counter.innerHTML = count;
};

const sendScore = () => {
  fetch("https://bq-server.onrender.com/api/result/5bhlck5r", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdG9ySWQiOiI2NDUxNmQ0OTNlZTg2NDE0YmY5NmFjMTgiLCJzY29yZWJvYXJkSWQiOiI1YmhsY2s1ciIsImlhdCI6MTcxMjc0NDE1OH0.HjteQEuvPGLriiXVU7XnLhf7eDIoPdKHr3VqoDU4k2g",
    },
    body: JSON.stringify({
      displayTitle: userName,
      additionalInfo: "",
      points: count,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const startTimer = () => {
  timer.innerHTML = `left: ${timeLeft}s`;

  const interval = setInterval(() => {
    timeLeft = timeLeft - 1;
    timer.innerHTML = `left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      contentComponent.innerHTML = `
      <div class="results">
        <div>Thanks ${userName} for the game!</div>
        <div class="score">Your score is ${count}</div>
        <div>Look at the board now!</div>
      </div>
      `;
      sendScore();
    }
  }, 1000);
};

const startGame = () => {
  contentComponent.append(counter);
  contentComponent.append(tapper);
  contentComponent.append(timer);

  updateCount();
  startTimer();
};

startBtn.addEventListener("click", () => {
  userName = userNameInput.value;
  contentComponent.innerHTML = "";
  startGame();
});

tapper.addEventListener("click", () => {
  count++;
  updateCount();
});
