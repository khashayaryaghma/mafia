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
const selectedRoles = getFromLocalStorage("roles") || {
  citizen: [],
  mafia: [],
  additional: [],
};
const nextBtn = selectedElement(".next-btn");
const gameRoles = selectedElement(".game-roles");
if (getFromLocalStorage("players")) {
  playersData.push(...getFromLocalStorage("players"));
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
  const sumOfSelectedRoles =
    selectedRoles.citizen.length +
    selectedRoles.mafia.length +
    selectedRoles.additional.length;
  if (
    sumOfSelectedRoles < playersData.length ||
    e.target.classList.contains("btn-light") ||
    e.target.classList.contains("btn-danger") ||
    e.target.classList.contains("btn-warning")
  ) {
    if (e.target.classList.contains("btn-outline-light")) {
      e.target.classList.replace("btn-outline-light", "btn-light");
      selectedRoles.citizen.push(e.target.textContent);
    } else if (e.target.classList.contains("btn-outline-danger")) {
      e.target.classList.replace("btn-outline-danger", "btn-danger");
      selectedRoles.mafia.push(e.target.textContent);
    } else if (e.target.classList.contains("btn-outline-warning")) {
      if (15 <= playersData.length) {
        e.target.classList.replace("btn-outline-warning", "btn-warning");
        selectedRoles.additional.push(e.target.textContent);
      } else {
        alert(
          "To select these roles, the number of players must be 15 or more"
        );
      }
    } else if (e.target.classList.contains("btn-light")) {
      e.target.classList.replace("btn-light", "btn-outline-light");
      selectedRoles.citizen.forEach((role, index) => {
        if (role === e.target.textContent) {
          selectedRoles.citizen.splice(index, 1);
        }
      });
    } else if (e.target.classList.contains("btn-danger")) {
      e.target.classList.replace("btn-danger", "btn-outline-danger");
      selectedRoles.mafia.forEach((role, index) => {
        if (role === e.target.textContent) {
          selectedRoles.mafia.splice(index, 1);
        }
      });
    } else if (e.target.classList.contains("btn-warning")) {
      e.target.classList.replace("btn-warning", "btn-outline-warning");
      selectedRoles.additional.forEach((role, index) => {
        if (role === e.target.textContent) {
          selectedRoles.additional.splice(index, 1);
        }
      });
    }
    saveToLocalStorage("roles", selectedRoles);
    const sumOfSelectedRoles =
      selectedRoles.citizen.length +
      selectedRoles.mafia.length +
      selectedRoles.additional.length;
    if (sumOfSelectedRoles == playersData.length) {
      nextBtn.disabled = false;
    }
  } else {
    alert("You have reached the maximum number of role selections");
  }
};

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

nextBtn.addEventListener("click", () => {
  window.location.href = "../../pages/2-game.html";
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
