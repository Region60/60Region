import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/type";

type PropsType = {
    currentPage:number
    totalUsersCount:number
    pageSize:number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingIsProgress: ()=> void
    unfollow:()=> void
    follow:()=> void
}
let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, ...props}) => {

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount}
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