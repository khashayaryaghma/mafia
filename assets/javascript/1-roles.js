import { createElement, selectedElement } from "../../utils/domUtils.js";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/storageUtils.js";

// collect playerData
const playersData = [];
if (getFromLocalStorage("players")) {
  playersData.push(...getFromLocalStorage("players"));
}
//collect all roles in a variable
const allRoles = {
  citizen: [
    "Doctor",
    "Detective",
    "Sniper",
    "Rifleman",
    "Roeen tan",
    "Rad gir",
    "Anti Lady",
    "Judge",
    "Bartender",
    "Gambler",
    "Viewer",
    "Cowboy",
    "Mason",
    "Tyler",
    "Priest",
    "Bodyguard",
    "Citizen",
    "Citizen",
    "Citizen",
    "Citizen",
  ],
  mafia: ["Godfather", "Dr. Lecter", "Terrorist", "Vandal", "Spy", "Lawyer", "Lady Voodoo", "Ninja", "Natasha", "Mafia", "Mafia"],
  additional: ["Killer", "Joker"],
};
//show all roles in pages
const gameRoles = selectedElement(".game-roles");

allRoles.citizen.forEach((el) => {
  const roleBtn = createElement("button", el, ["btn", "m-1", "btn-outline-light"]);
  roleBtn.addEventListener("click", handleBtnRole);
  gameRoles.append(roleBtn);
});
allRoles.mafia.forEach((el) => {
  const roleBtn = createElement("button", el, ["btn", "m-1", "btn-outline-danger"]);
  roleBtn.addEventListener("click", handleBtnRole);
  gameRoles.append(roleBtn);
});
allRoles.additional.forEach((el) => {
  const roleBtn = createElement("button", el, ["btn", "m-1", "btn-outline-warning"]);
  roleBtn.addEventListener("click", handleBtnRole);
  gameRoles.append(roleBtn);
});

// handle select roles
const selectedRoles = getFromLocalStorage("roles") || [];

function handleBtnRole(e) {
  if (selectedRoles.length < playersData.length || e.target.classList.contains("btn-success")) {
    if (!e.target.classList.contains("btn-success")) {
      selectedRoles.push(e.target.textContent);
      e.target.classList.add("btn-success");
    } else if (e.target.classList.contains("btn-success")) {
      selectedRoles.forEach((role, index) => {
        if (role === e.target.textContent) {
          selectedRoles.splice(index, 1);
          e.target.classList.remove("btn-success");
        }
      });
    }
    saveToLocalStorage("roles", selectedRoles);

    if (selectedRoles.length == playersData.length) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  } else {
    alert("You have reached the maximum number of role selections");
  }
}

//Next page
const nextBtn = selectedElement(".next-btn");
nextBtn.addEventListener("click", () => {
  window.location.href = "../../pages/2-game.html";
});
