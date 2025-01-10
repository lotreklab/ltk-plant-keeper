import { combineReducers } from "@reduxjs/toolkit";
import counter from "./counter";
import onboarding from "./onboarding";
import wordgarden from "./motivational";

export default combineReducers({
  counter, 
  onboarding,
  wordgarden
})