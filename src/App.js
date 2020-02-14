import React from 'react';

import './App.css';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Profile from './components/profiles/Profile';
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/news/News";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";


const App = (props) => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Route path='/profile'
                           render={() => <Profile/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer />}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
