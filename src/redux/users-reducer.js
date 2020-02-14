let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';
let CURRENT_PAGE = 'CURRENT_PAGE';
let TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}
const usersReducer = (state = initialState, action) => {
        switch (action.type) {
            case FOLLOW:
                return {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: false}  //возвращаем копию users и меняем значение свойства followed на true
                        }
                        return u;
                    })
                }
            case UNFOLLOW:
                return {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true}  //возвращаем копию users и меняем значение свойства followed на false
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
                return {...state, isFetching: action.toggle}
            default:
                return state
        }
    }
;

export const followActionCreator = (userId) => {
    return {type: FOLLOW, userId}
}
export const unFollowActionCreator = (userId) => {
    return {type: UNFOLLOW, userId}
}
export const setUsersActionCreator = (users) => ({type: SET_USERS, users})    //не пишем ретурн, возвращаемый объект помещаем в круглые кнопки
export const setTotalUserCountActionCreator = (totalUsersCount) => ({type: TOTAL_USERS_COUNT, count: totalUsersCount})
export const setCurrentPageActionCreator = (currentPage) => {
    return {type: CURRENT_PAGE, currentPage: currentPage}
}
export const setToggleIsFetchingActionCreator = (toggle) => ({type: TOGGLE_IS_FETCHING, count: toggle})

export default usersReducer;