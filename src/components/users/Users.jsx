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
                            <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                    withCredentials: true,
                                    "API-KEY": "ae9f4f72-b180-4d04-a84e-9fd4f03c3b27"
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.unfollow(u.id)
                                        }
                                    })

                            }}>Unfollow</button>
                            :
                            <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    "API-KEY": "ae9f4f72-b180-4d04-a84e-9fd4f03c3b27"
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
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