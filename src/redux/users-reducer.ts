import {updateObjectInArray} from "../components/utiles/object-helpers";
import {PhotosType, UsersType} from "../types/type";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/user-api";
import {FormAction} from "redux-form";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const CURRENT_PAGE = 'CURRENT_PAGE';
const TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingIsProgress: [] as Array<number> //array users IDs
}
type initialState = typeof  initialState

const usersReducer = (state = initialState, action: ActionsTypes): initialState => {
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

type ActionsTypes = InferActionsTypes<typeof actionsUserReducer>
type ThunkType  = BaseThunkType<ActionsTypes | FormAction>


 export const actionsUserReducer = {
 followSuccess: (userId: number) => {return {type: FOLLOW, userId}as const},
 unfollowSuccess: (userId: number) => {return {type: UNFOLLOW, userId}as const},
 setUsers : (users: Array<UsersType>)=> ({ type: SET_USERS, users}as const),  //не пишем ретурн, возвращаемый объект помещаем в круглые кнопки
 setTotalUserCount: (totalUsersCount: number) => ({type: TOTAL_USERS_COUNT, count: totalUsersCount}as const),
 setCurrentPage: (currentPage: number)=> {return {type: CURRENT_PAGE, currentPage: currentPage}as const},
 toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}as const),
 toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS,isFetching,userId}as const)
}

export const reqestUsers = (currentPage: number, pageSize: number): ThunkAction<Promise<void>,AppStateType,unknown,ActionsTypes> => {
    return async (dispatch, getState ) => {
        dispatch(actionsUserReducer.toggleIsFetching(true))
        dispatch(actionsUserReducer.setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actionsUserReducer.toggleIsFetching(false))
        dispatch(actionsUserReducer.setUsers(data.items))
        dispatch(actionsUserReducer.setTotalUserCount(data.totalCount))
        dispatch(actionsUserReducer.setCurrentPage(currentPage))
    }
}

export const followUnfollowFlow = async (userId:number, dispatch: any, apiMethod:any, actionCreator:any) => {
    dispatch(actionsUserReducer.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actionsUserReducer.toggleFollowingProgress(false, userId))
}

export const unfollow = (userId:number):ThunkType => {
    return async (dispatch,getState) => {
        let actionCreator = await actionsUserReducer.unfollowSuccess
        followUnfollowFlow(userId, dispatch, usersAPI.unfollow.bind(usersAPI), actionCreator)
    }
}


export const follow = (userId:number):ThunkType=> {
    return async (dispatch,getState) => {
        let actionCreator = await actionsUserReducer.followSuccess
        followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(usersAPI), actionCreator)
    }
}


export default usersReducer;