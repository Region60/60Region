import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUsersActionCreator, unFollowActionCreator} from "../../redux/users-reducer";


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unFollowActionCreator(userId))
        },
        setUser: (users) => {
            dispatch(setUsersActionCreator(users))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);