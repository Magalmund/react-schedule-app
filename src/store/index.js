import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
import {userReducer} from "./userReducer.js";
import {shiftReducer} from "./shiftReducer.js";
import {employeeReducer} from "./employeeReducer.js";


const rootReducer = combineReducers({
    user: userReducer,
    shift: shiftReducer,
    employee: employeeReducer,
});


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

