import React from 'react';
import classes from './Users.module.css'
import userImg from '../../img/userImg.png'
import {NavLink} from "react-router-dom";
import {UsersType} from "../../types/type";


type PropsType = {
    user: UsersType
    followingIsProgress: Array<number>
    unfollow: (userId: number)=>void
    follow: (userId: number)=>void
}

let User: React.FC<PropsType>  = ({user, followingIsProgress, unfollow, follow}) => {

    return <div>

        <div className={classes.user}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userImg} className={classes.photo} alt='img'/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingIsProgress
                        .some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }}>
                        unfollow</button>
                    : <button disabled={followingIsProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>follow</button>}
            </div>
        </div>
        <div className={classes.userInfo}>
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