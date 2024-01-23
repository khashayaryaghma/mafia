import { createElement, selectedElement } from "../../utils/domUtils.js";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/storageUtils.js";

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
const mafiaRolesData = [
  "Godfather",
  "Dr. Lecter",
  "Terrorist",
  "Vandal",
  "Spy",
  "Lawyer",
  "Lady Voodoo",
  "Ninja",
  "Natasha",
  "Mafia",
  "Mafia",
];
const additionalRolesData = ["Killer", "Joker"];
const allRoles = [];
const playersData = [];
const selectedRoles = {
  citizen: [],
  mafia: [],
  additional: [],
};
if (getFromLocalStorage("players")) {
  playersData.push(...JSON.parse(getFromLocalStorage("players")));
}
citizenRolesData.forEach((role) => {
  allRoles.push({ citizen: role });
});
mafiaRolesData.forEach((role) => {
  allRoles.push({ mafia: role });
});
additionalRolesData.forEach((role) => {
  allRoles.push({ additional: role });
});

const handleBtnRole = (e) => {
  if (e.target.classList.contains("btn-outline-light")) {
    e.target.classList.replace("btn-outline-light", "btn-light");
    selectedRoles.citizen.push(e.target.textContent);
  } else if (e.target.classList.contains("btn-outline-danger")) {
    e.target.classList.replace("btn-outline-danger", "btn-danger");
    selectedRoles.citizen.push(e.target.textContent);
  } else {
    e.target.classList.replace("btn-outline-warning", "btn-warning");
    selectedRoles.citizen.push(e.target.textContent);
  }
};
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
  const roleBtn = createElement("button", ...content, ["btn", className]);
  roleBtn.addEventListener("click", handleBtnRole);
  gameRoles.append(roleBtn);
});
/*
function manageRolesSelection(playerCount) {
  // Mandatory roles for any number of players
  const mandatoryRoles = ["Godfather", "Citizen"];

  // Calculate available mafia slots and remaining slots
  let mafiaSlots = Math.floor(playerCount / 3);
  let remainingSlots = playerCount - mafiaSlots - mandatoryRoles.length;

  // Set restrictions based on player count
  if (playerCount >= 15 && playerCount < 33) {
    remainingSlots--; // Reserve one slot for an additional role
  }

  // Enable all roles at 33 players
  if (playerCount >= 33) {
    mafiaSlots = mafiaRolesData.length;
    remainingSlots = citizenRolesData.length + additionalRolesData.length;
  }

  // Generate available roles options
  const availableRoles = {
    mafia: mafiaRolesData.slice(0, mafiaSlots),
    citizen: citizenRolesData.slice(0, remainingSlots),
    additional: playerCount >= 15 ? additionalRolesData : [],
  };

  // Return available roles for admin selection
  return availableRoles;
}
// Example usage
const chosenRoles = manageRolesSelection(10);
console.log(chosenRoles); // { mafia: [...], citizen: [...], additional: [...] }
*/
