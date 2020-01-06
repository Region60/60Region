import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addMessage, addPost, updateNewMessageText, updateNewPostText} from './redux/state';
import {BrowserRouter} from "react-router-dom";
import state, {subscribe} from  './redux/state';


let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 addPost={addPost}
                 updateNewPostText={updateNewPostText}
                 addMessage={addMessage}
                 updateNewMessageText={updateNewMessageText}/>
        </BrowserRouter>,

        document.getElementById('root'));
}
rerenderEntireTree(state);
subscribe (rerenderEntireTree);


