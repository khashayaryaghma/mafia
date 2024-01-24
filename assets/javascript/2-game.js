import { createElement, selectedElement } from "../../utils/domUtils.js";

const timer = selectedElement(".timer");
const startBtn = selectedElement(".btn-start");
const pauseBtn = selectedElement(".btn-pause");
const resetBtn = selectedElement(".btn-reset");
const totalTime = 120;
let time = totalTime;
timer.innerText = time;

startBtn.addEventListener("click", () => {
  const ti = setInterval(() => {
    --time;
    timer.innerText = time;
    if (time === 0) {
      clearInterval(ti);
      timer.innerText = "finished!";
    }
    pauseBtn.addEventListener("click", () => {
      clearInterval(ti);
    });
    resetBtn.addEventListener("click", () => {
      clearInterval(ti);
      time = totalTime;
      timer.innerText = totalTime;
    });
  }, 1000);
});
