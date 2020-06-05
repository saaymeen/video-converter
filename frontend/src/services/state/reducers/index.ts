import { combineReducers } from "redux";
import visibilityFilter from "./download";
import todos from "./convert";

export default combineReducers({ todos, visibilityFilter });
