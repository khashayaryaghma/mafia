const createElement = (name, content, classes) => {
  const element = document.createElement(name);
  element.classList.add(...classes);
  element.append(content);
  return element;
};

const selectedElement = (query) => {
  const element = document.querySelector(query);
  return element;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const handleDeleteBtn = (e) => {
  const li = e.target.parentElement;
  const index = li.id;
  playersData.splice(index, 1);
  saveToLocalStorage("players", playersData);
  li.remove();
};

const handleEditBtn = (e) => {
  const li = e.target.parentElement;
  const index = li.id;
  const player = playersData[index];
  inputForm.value = player;
  playersData.splice(index, 1);
  saveToLocalStorage("players", playersData);
  li.remove();
};

const createListOfPlayers = (data, appendElement) => {
  data.forEach((player, index) => {
    const li = createElement("li", player, ["player-list"]);
    const deleteBtn = createElement("button", "X", ["delete-btn", "btn"]);
    deleteBtn.addEventListener("click", handleDeleteBtn);
    const editBtn = createElement("button", "Edit", ["edit-btn", "btn"]);
    editBtn.addEventListener("click", handleEditBtn);
    li.id = index;
    li.append(deleteBtn);
    li.append(editBtn);
    appendElement.append(li);
  });
};

const gameForm = selectedElement(".game-form");
const inputForm = selectedElement(".input-form");
const addPlayerBtn = selectedElement(".add-player-btn");
const listOfPlayers = selectedElement(".list-of-players");
const nextBtn = selectedElement(".next-btn");

const playersData = [];
if (getFromLocalStorage("players")) {
  playersData.push(...JSON.parse(getFromLocalStorage("players")));
  createListOfPlayers(playersData, listOfPlayers);
}

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

addPlayerBtn.addEventListener("click", () => {
  if (playersData.length === 31) {
    addPlayerBtn.disabled = true;
  } else if (inputForm.value) {
    playersData.push(inputForm.value);
    saveToLocalStorage("players", playersData);
    inputForm.value = "";
    if (playersData.length >= 10) {
    }
  } else {
    alert("Please enter a player name");
  }

  listOfPlayers.innerText = "";
  createListOfPlayers(playersData, listOfPlayers);
});
