import { combineReducers } from "@reduxjs/toolkit";
import counter from "./counter";
import onboarding from "./onboarding";
import wordgarden from "./motivational";
import species from "./species";
import plants from "./plants";
import starred from "./starred";

export default combineReducers({
  counter,
  onboarding,
  wordgarden,
  species,
  plants,
  starred,
})
