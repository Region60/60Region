import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../components/utiles/object-helpers";
import {PhotosType, UsersType} from "../types/type";


let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';
let CURRENT_PAGE = 'CURRENT_PAGE';
let TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'




let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingIsProgress: [] as Array<number> //array users IDs
}
type initialState = typeof  initialState

const usersReducer = (state = initialState, action:any): initialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}  //возвращаем копию users и меняем значение свойства followed на false
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: action.users}
        case CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingIsProgress: action.isFetching
                    ? [...state.followingIsProgress, action.userId]
                    : state.followingIsProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
type  FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number):FollowSuccessType => {
    return {type: FOLLOW, userId}
}
type  UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number):UnfollowSuccessType => {
    return {type: UNFOLLOW, userId}
}
type SetUsersType = {
    type: typeof SET_USERS
    users:  Array<UsersType>
}
export const setUsers = (users: UsersType) => ({type: SET_USERS, users})    //не пишем ретурн, возвращаемый объект помещаем в круглые кнопки
type SetTotalUserCountType = {
    type: typeof TOTAL_USERS_COUNT
    count: number
}
export const setTotalUserCount = (totalUsersCount: number) => ({type: TOTAL_USERS_COUNT, count: totalUsersCount})
type SetCurrentPage = {
    type: typeof CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number) => {
    return {type: CURRENT_PAGE, currentPage: currentPage}
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
type  ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const reqestUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUserCount(data.totalCount))
        dispatch(setCurrentPage(currentPage))
    }
}

export const followUnfollowFlow = async (userId:number, dispatch: any, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const unfollow = (userId:number) => {
    return async (dispatch:any) => {
        let actionCreator = await unfollowSuccess
        followUnfollowFlow(userId, dispatch, usersAPI.unfollow.bind(usersAPI), actionCreator)
    }
}

export const follow = (userId:number) => {
    return async (dispatch: any) => {
        let actionCreator = await followSuccess
        followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(usersAPI), actionCreator)
    }
}


export default usersReducer;