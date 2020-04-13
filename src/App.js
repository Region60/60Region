import React, {Component} from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import {Route, withRouter} from "react-router-dom";
import News from "./components/news/News";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profiles/ProfileContainer";
import HeaderContainer from "./components/header/HeaderCotainer";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (

                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Nav/>
                    <div className='app-wrapper-content'>
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>
                        <Route path='/users'
                               render={() => <UsersContainer/>}/>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}/>
                        <Route path='/login'
                               render={() => <Login/>}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                    </div>
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized:state.app.initialized

})

export default compose(
    withRouter,
    connect(mapStateToProps,{initializeApp})) (App)
