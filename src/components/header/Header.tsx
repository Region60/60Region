import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
  login: () => void
  logout: () => void
  isAuth: boolean
}
const Header: React.FC<PropsType> = (props) => {
  return <div className={classes.header}>
    <div className={classes.headerImg}>
    <img src='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png' alt='img'></img>
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