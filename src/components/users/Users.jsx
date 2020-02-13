import React from 'react';
import classes from './Users.module.css'
import * as axios from 'axios'
import userImg from '../../img/userImg.png'

let Users =(props) => {
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
                            <img src={u.photos.small != null ? u.photos : userImg} className={classes.photo}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.follow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Follow</button>
                            }
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