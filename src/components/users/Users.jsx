import React from 'react';
import classes from './Users.module.css'
import userImg from '../../img/userImg.png'
import {NavLink} from "react-router-dom";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div>
        {
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && classes.selectedPage}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}>  {p} </span>
                })}
            </div>
        }
        {
            props.users.map(u => <div key={u.id}>
                <div>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userImg} className={classes.photo}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingIsProgress
                                .some(id => id === u.id)}
                                    onClick={() => {props.unfollow(u.id)}}>
                                unfollow</button>
                            :<button disabled={props.followingIsProgress.some(id => id === u.id)}
                                    onClick={() => {
                                        props.follow(u.id)
                                    }}>follow</button>}
                    </div>
                </div>
                <div>
                    <div>
                        <div> {u.name} </div>
                        <div> {u.status} </div>
                    </div>
                    <div>
                        <div> {"u.location.city"}  </div>
                        <div> {"u.location.country"}   </div>
                    </div>
                </div>
            </div>)
        }
    </div>
}


export default Users;