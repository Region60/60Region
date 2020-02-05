let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';

let initialState = {
    /*users:*/
}
const usersReducer = (state = initialState, action) => {
        switch (action.type) {
            case FOLLOW:
                return {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true}  //возвращаем копию users и меняем значение свойства followed на true
                        }
                        return u;
                    })
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
                return {...state, users: [...state.users, ...action.users]}
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

export default usersReducer;