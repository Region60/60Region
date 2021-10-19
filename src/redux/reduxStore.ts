import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer.js";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";

let rootReducers = combineReducers({

    profilePage: profileReducer,
    messagesPage: dialogReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form: formReducer,
    app:appReducer
});
type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;
