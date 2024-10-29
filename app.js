const hoursInput = document.querySelector("#main-hours");
const minutesInput = document.querySelector("#main-minutes");
const secondsInput = document.querySelector("#main-seconds");

const play = document.querySelector("#play");
const restart = document.querySelector("#restart");
const pause = document.querySelector("#stop");

let countdown;
let totalTime = 0;
let isRunning = false;

const alarmSound = new Audio("alarm.mp3");

function setTimeOnMainTimer(hours, minutes, seconds) {
  hoursInput.value = String(hours).padStart(2, "0");
  minutesInput.value = String(minutes).padStart(2, "0");
  secondsInput.value = String(seconds).padStart(2, "0");
  totalTime = hours * 3600 + minutes * 60 + seconds;
  isRunning = false;
}

function updateTotalTime() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  totalTime = hours * 3600 + minutes * 60 + seconds;
}

hoursInput.addEventListener("input", updateTotalTime);
minutesInput.addEventListener("input", updateTotalTime);
secondsInput.addEventListener("input", updateTotalTime);

document.querySelector("#timer-1").addEventListener("click", () => {
  setTimeOnMainTimer(0, 15, 0);
});
document.querySelector("#timer-2").addEventListener("click", () => {
  setTimeOnMainTimer(0, 30, 0);
});
document.querySelector("#timer-3").addEventListener("click", () => {
  setTimeOnMainTimer(0, 45, 0);
});

play.addEventListener("click", () => {
  if (totalTime > 0 && !isRunning) {
    startTimer();
  }
});

pause.addEventListener("click", () => {
  clearInterval(countdown);
  isRunning = false;
});

restart.addEventListener("click", () => {
  clearInterval(countdown);
  setTimeOnMainTimer(0, 0, 0);
  isRunning = false;
});

function startTimer() {
  isRunning = true;
  countdown = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(countdown);
      alarmSound.play();
      isRunning = false;
      return;
    }

    totalTime--;

    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    setTimeOnMainTimer(hours, minutes, seconds);
  }, 1000);
}
