import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from './redux/reduxStore';
import StoreContext from "./StoreContext";


let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={store}>
            <App />
            </StoreContext.Provider>
        </BrowserRouter>,

        document.getElementById('root'));
}
rerenderEntireTree(store.getState);
store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
});


