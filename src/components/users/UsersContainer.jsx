import React from 'react';
import {connect} from "react-redux";
import UsersApiComponent from "./UsersApiComponent";
import {
    followActionCreator,
    setCurrentPageActionCreator, setTotalUserCountActionCreator,
    setUsersActionCreator,
    unFollowActionCreator
} from "../../redux/users-reducer";


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
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
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        setTotalUserCount: (totalCount) => {
            dispatch(setTotalUserCountActionCreator(totalCount))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersApiComponent);