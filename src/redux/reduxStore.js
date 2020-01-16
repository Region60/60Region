import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogReducer
});

let store = createStore(reducers);

export default store;
