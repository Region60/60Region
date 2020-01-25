import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import store from './redux/reduxStore';


let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store}
                state={store.getState()}
                 dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>,

        document.getElementById('root'));
}
rerenderEntireTree(store.getState);
store.subscribe (()=>{
    let state = store.getState ()
    rerenderEntireTree(state)
});


