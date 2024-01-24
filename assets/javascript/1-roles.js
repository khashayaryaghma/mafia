import { createElement, selectedElement } from "../../utils/domUtils.js";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/storageUtils.js";

const citizenRolesData = [
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
];
const mafiaRolesData = ["Godfather", "Dr. Lecter", "Terrorist", "Vandal", "Spy", "Lawyer", "Lady Voodoo", "Ninja", "Natasha", "Mafia", "Mafia"];
const additionalRolesData = ["Killer", "Joker"];

// collect playerData
const playersData = [];
if (getFromLocalStorage("players")) {
  playersData.push(...getFromLocalStorage("players"));
}
//collect all roles in a variable
const allRoles = [];
citizenRolesData.forEach((role) => {
  allRoles.push({ citizen: role });
});
mafiaRolesData.forEach((role) => {
  allRoles.push({ mafia: role });
});
additionalRolesData.forEach((role) => {
  allRoles.push({ additional: role });
});
//show all roles in pages
const gameRoles = selectedElement(".game-roles");

allRoles.forEach((role) => {
  const content = Object.values(role);
  let className = "";
  if (Object.keys(role).join() === "citizen") {
    className = "btn-outline-light";
  } else if (Object.keys(role).join() === "mafia") {
    className = "btn-outline-danger";
  } else {
    className = "btn-outline-warning";
  }
  const roleBtn = createElement("button", ...content, ["btn", "m-1", className]);
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
