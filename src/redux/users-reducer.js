import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../components/utiles/object-helpers";

let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';
let CURRENT_PAGE = 'CURRENT_PAGE';
let TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingIsProgress: []

}
const usersReducer = (state = initialState, action) => {
        switch (action.type) {
            case FOLLOW:
                return {
                    ...state,
                    users: updateObjectInArray (state.users, action.userId,"id", {followed: true})
                }
            case UNFOLLOW:
                return {
                    ...state,
                    users: state.users.map(u => {
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
                        : state.followingIsProgress.filter(id => id != action.userId)
                }
            default:
                return state
        }
    }
;

export const followSuccess = (userId) => {
    return {type: FOLLOW, userId}
}
export const unfollowSuccess = (userId) => {
    return {type: UNFOLLOW, userId}
}
export const setUsers = (users) => ({type: SET_USERS, users})    //не пишем ретурн, возвращаемый объект помещаем в круглые кнопки
export const setTotalUserCount = (totalUsersCount) => ({type: TOTAL_USERS_COUNT, count: totalUsersCount})
export const setCurrentPage = (currentPage) => {
    return {type: CURRENT_PAGE, currentPage: currentPage}
}
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const reqestUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUserCount(data.totalCount))
        dispatch(setCurrentPage(currentPage))
    }
}

export const followUnfollowFlow = async (userId, dispatch, apiMethod, actionCreator) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        let response = apiMethod
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        let actionCreator = unfollowSuccess
        followUnfollowFlow(userId, dispatch, usersAPI.unfollow.bind(usersAPI), actionCreator)
    }
}

export const follow = (userId) => {
    return async (dispatch) => {
        let actionCreator = followSuccess
        followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(usersAPI), actionCreator)
    }
}


export default usersReducer;