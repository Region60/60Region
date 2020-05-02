import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return <div className={classes.header}>
    <div className={classes.headerImg}>
    <img src='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'></img>
      </div>
    <span className={classes.headerName}>
          Social Network
      </span>
    <div className={classes.loginBlock}>
      {props.isAuth
          ?<div>{ props.login} -<button onClick={props.logout}>Logout</button> </div>
          :<NavLink to={'/login'}>Login</NavLink>}
    </div>
  </div>

}
export default Header;