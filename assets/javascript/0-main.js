import { createElement, selectedElement } from "../../utils/domUtils.js";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/storageUtils.js";

const gameForm = selectedElement(".game-form");
const inputForm = selectedElement(".input-form");
const addPlayerBtn = selectedElement(".add-player-btn");
const listOfPlayers = selectedElement(".list-of-players");
const nextBtn = selectedElement(".next-btn");

const playersData = [];

const createListOfPlayers = (data, appendElement) => {
  data.forEach((player, index) => {
    const li = createElement("li", player, [
      "player-list",
      "rounded",
      "shadow-sm",
      "d-flex",
      "align-items-center",
      "mb-3",
      "px-3",
      "py-1",
      "d-flex",
      "justify-content-between",
      "bg-secondary",
      "text-white",
      "bg-gradient",
    ]);
    const deleteBtn = createElement("button", "X", ["delete-btn", "btn", "btn-danger"]);
    deleteBtn.addEventListener("click", handleDeleteBtn);
    const editBtn = createElement("button", "Edit", ["edit-btn", "btn", "btn-warning", "m-1"]);
    editBtn.addEventListener("click", handleEditBtn);
    li.id = index;
    const div = createElement("div", "", []);
    div.append(editBtn, deleteBtn);
    li.append(div);
    appendElement.append(li);
  });
};

const handleDeleteBtn = (e) => {
  const li = e.target.parentElement.parentElement;
  const index = li.id;
  playersData.splice(index, 1);
  saveToLocalStorage("players", playersData);
  li.remove();
  listOfPlayers.innerText = "";
  createListOfPlayers(playersData, listOfPlayers);
  if (playersData.length < 33) {
    addPlayerBtn.disabled = false;
    inputForm.disabled = false;
  }
  if (playersData.length < 10) {
    nextBtn.disabled = true;
  }
};

const handleEditBtn = (e) => {
  addPlayerBtn.disabled = false;
  inputForm.disabled = false;
  const li = e.target.parentElement.parentElement;
  const index = li.id;
  const player = playersData[index];
  inputForm.value = player;
  playersData.splice(index, 1);
  saveToLocalStorage("players", playersData);
  li.remove();
  if (playersData.length < 10) {
    nextBtn.disabled = true;
  }
};

if (getFromLocalStorage("players")) {
  playersData.push(...getFromLocalStorage("players"));
  createListOfPlayers(playersData, listOfPlayers);
  if (playersData.length > 32) {
    addPlayerBtn.disabled = true;
    inputForm.disabled = true;
  }
  if (playersData.length >= 10) {
    nextBtn.disabled = false;
  }
}

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (playersData.length > 32) {
    alert(`Cannot add "${inputForm.value}" you have reached the maximum number of players`);
    addPlayerBtn.disabled = true;
    inputForm.disabled = true;
    inputForm.value = "";
  } else if (inputForm.value) {
    playersData.push(inputForm.value.trim());
    saveToLocalStorage("players", playersData);
    inputForm.value = "";
    if (playersData.length >= 10) {
      nextBtn.disabled = false;
    }
  } else {
    alert("Please enter a player name");
  }

  listOfPlayers.innerText = "";
  createListOfPlayers(playersData, listOfPlayers);
});

nextBtn.addEventListener("click", () => {
  window.location.href = "../../pages/1-roles.html";
});
