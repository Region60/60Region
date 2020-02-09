import React from 'react';
import classes from './Users.module.css'
import * as axios from 'axios'
import userImg from '../../img/userImg.png'

class Users extends React.Component {

    constructor(props) {
        super(props)
        if (this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    this.props.setUser(response.data.items)
                })
        }
    }

    render() {
        return <div>
            {
                this.props.users.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <img src={u.photos.small != null ? u.photos : userImg} className={classes.photo}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.unfollow(u.id)
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
}

export default Users;