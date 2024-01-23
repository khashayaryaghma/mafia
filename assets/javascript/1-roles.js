import {
  createElement,
  getFromLocalStorage,
  saveToLocalStorage,
  selectedElement,
} from "./script.js";

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
const chosenRoles = manageRolesSelection(20);
console.log(chosenRoles); // { mafia: [...], citizen: [...], additional: [...] }
