import React from 'react';
import classes from './Users.module.css'
import * as axios from 'axios'
import userImg from '../../img/userImg.png'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUser(response.data.items)
                this.props.setTotalUserCount(response.data.totalCount)

            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUser(response.data.items)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return <div>
            <div>
                {pages.map(p => {
                    return <span className={this.props.currentPage === p && classes.selectedPage}
                                 onClick={() => {
                                     this.onPageChanged(p)
                                 }}>{p}</span>
                })}

            </div>
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