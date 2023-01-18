import { applyMiddleware, combineReducers, createStore } from "redux";

import { logger, thunk } from "./middleware";
import commentReducer from "./comment";

const rootReducer = combineReducers({
  comment: commentReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
