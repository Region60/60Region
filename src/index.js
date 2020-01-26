import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from './redux/reduxStore';
import {Provider} from "react-redux";


let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App />
            </Provider>
        </BrowserRouter>,

        document.getElementById('root'));
}
rerenderEntireTree();
store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
});


