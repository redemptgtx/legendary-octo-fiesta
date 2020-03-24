import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import characterReducer from "./reducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    character: characterReducer
  });

export default createRootReducer;
