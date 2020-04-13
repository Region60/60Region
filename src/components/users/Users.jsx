import React from 'react';
import classes from './Users.module.css'
import userImg from '../../img/userImg.png'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, totalUserCount, pageSize, onPageChanged, ...props}) => {

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUserCount}
                   pageSize={pageSize}/>
        <div>
            {
                props.users.map(u => <User user={u}
                                           key={u.id}
                                           followingIsProgress={props.followingIsProgress}
                                           unfollow={props.unfollow}
                                           follow={props.follow}/>)
            }
        </div>
    </div>
}


export default Users;