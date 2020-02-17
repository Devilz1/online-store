import { combineReducers } from "redux";
import { basketReducer } from "./basket";

export const rootReducer: any = combineReducers({
    basket: basketReducer
});