import React from 'react';
import classes from './Users.module.css'
import * as axios from 'axios'
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
                        {u.followed ?
                            <button disabled={props.followingIsProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id)
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "0ac29fb6-636b-4af2-87ca-b7b9a9a44a51"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
                                        props.toggleFollowingProgress(false, u.id)
                                    })

                            }}>Unfollow</button>
                            :
                            <button disabled={props.followingIsProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id)
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "0ac29fb6-636b-4af2-87ca-b7b9a9a44a51"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.toggleFollowingProgress(false, u.id)
                                    })
                            }}>Follow</button>}
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