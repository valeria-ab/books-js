//редаксовская ф-я смешивающая редюсеры
import {booksReducer} from "./books-reducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
   books: booksReducer
})


export const store = createStore(rootReducer)



window.store = store;
