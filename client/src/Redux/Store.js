import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk  from 'redux-thunk';
import {priceTicker} from "./redusers/redusers";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    priceTicker
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
