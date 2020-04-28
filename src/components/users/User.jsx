import React from 'react';
import classes from './Users.module.css'
import userImg from '../../img/userImg.png'
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

let User = ({user, followingIsProgress, unfollow, follow}) => {

    return <div>

        <div>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userImg} className={classes.photo}/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <Button
                        variant={"contained"}
                        size={"small"} disabled={followingIsProgress
                        .some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }}>
                        unfollow</Button>
                    : <Button
                        variant={"contained"}
                        size={"small"} disabled={followingIsProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>follow</Button>}
            </div>
        </div>
        <div>
            <div>
                <div> {user.name} </div>
                <div> {user.status} </div>
            </div>
            <div>
                <div> {"user.location.city"}  </div>
                <div> {"user.location.country"}   </div>
            </div>
        </div>
    </div>
}


export default User;