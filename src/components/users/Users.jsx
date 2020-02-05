import React from 'react';
import classes from './module.css'

const Users = (props) => {
    if(props.users.length === 0) {
        props.setUser([
            {
                id: 1,
                userPhoto: 'https://www.cheltv.ru/wp-content/uploads/2019/11/6456090c.jpeg',
                followed: true,
                fulname: 'Max',
                status: 'trololo',
                location: {city: 'Pskov', country: 'Russia'}
            },
            {
                id: 2,
                userPhoto: 'https://www.cheltv.ru/wp-content/uploads/2019/11/6456090c.jpeg',
                followed: false,
                fulname: 'Nik',
                status: 'excuse me',
                location: {city: 'Murmansk', country: 'Russia'}
            },
            {
                id: 3, userPhoto: 'https://www.cheltv.ru/wp-content/uploads/2019/11/6456090c.jpeg',
                followed: true,
                fulname: 'Diman',
                status: 'kak-to tak',
                location: {city: 'Murmansk', country: 'Russia'}
            }
        ])
    }

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <div>
                    <div>
                        <img src={u.userPhoto}  className={classes.photo}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={()=> {props.follow(u.id) } }>Unfollow</button>
                            : <button onClick={()=> {props.unfollow(u.id) } }>Follow</button>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <div> {u.fullName} </div>
                        <div> {u.status} </div>
                    </div>
                    <div>
                        <div> {u.location.city}  </div>
                        <div> {u.location.country}   </div>
                    </div>
                </div>
            </div>)
        }
    </div>
};
export default Users;