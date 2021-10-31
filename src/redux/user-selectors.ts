import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

export const getUsersSelector =(state: AppStateType) => {  //простой селектор ,который достает из стейта юзерс и возвращает его
     return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, //сложный селектор
(users) =>  {
    return users.filter(u=>true)
})

export const getPageSize =(state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount =(state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage =(state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching =(state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingIsProgress =(state: AppStateType) => {
    return state.usersPage.followingIsProgress
}

