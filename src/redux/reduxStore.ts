import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";
import usersReducer from "./users-reducer";

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
type PropertiesTypes<T> = T extends {[key:string]: infer U}? U : never
export type InferActionsTypes<T extends{[key: string]:(...args:any[])=>any}>=ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R,AppStateType,unknown,A>
let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;
