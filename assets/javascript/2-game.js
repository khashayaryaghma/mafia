import { createElement, selectedElement } from "../../utils/domUtils.js";
import { getFromLocalStorage } from "../../utils/storageUtils.js";

//timer
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

// assign roles to players
const roles = getFromLocalStorage("roles").sort(() => 0.5 - Math.random());
const players = getFromLocalStorage("players").sort(() => 0.5 - Math.random());
const all = [];
players.map((el, i) => {
  all.push({ player: el, role: roles[i] });
});

//list

const cardContainer = selectedElement(".cards-container");
all.map((el) => {
  // name
  const name = createElement("h3", el.player, ["h5"]);
  const role = createElement("p", el.role, ["h5"]);
  const card = createElement("div", name, [
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "border",
    "rounded",
    "text-white",
    "w-100",
    "p-4",
    "m-2",
  ]);

  // votes
  const votes = createElement("div", "", ["d-flex", "align-items-center", "m-2", "h6"]);
  const plusBtn = createElement("button", "+", ["btn", "btn-warning", "mx-3"]);
  const minusBtn = createElement("button", "-", ["btn", "btn-warning", "mx-3"]);
  let score = 0;
  let vote = createElement("span", score, []);
  plusBtn.addEventListener("click", () => {
    vote.innerText = ++score;
  });
  minusBtn.addEventListener("click", () => {
    if (score !== 0) {
      vote.innerText = --score;
    }
  });
  votes.append(minusBtn, vote, plusBtn);

  // delete button
  const deleteBtn = createElement("button", "X", ["delete-btn", "btn", "btn-danger", "mx-3"]);
  deleteBtn.addEventListener("click", () => {
    card.classList.toggle("deleted-user");
  });
  const rightContainer = createElement("div", votes, ["d-flex", "align-items-center"]);
  rightContainer.append(deleteBtn);
  card.append(role,rightContainer);
  cardContainer.append(card);
});
