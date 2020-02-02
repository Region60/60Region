let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';

let initialState = {
    users: [
        {id: 1, followed: true, fulname: 'Max', status: 'trololo', location: {city: 'Pskov', country: 'Russia'}},
        {id: 2, followed: false, fulname: 'Nik', status: 'excuse me', location: {city: 'Murmansk', country: 'Russia'}},
        {
            id: 3,
            followed: true,
            fulname: 'Diman',
            status: 'kak-to tak',
            location: {city: 'Murmansk', country: 'Russia'}
        },
    ]
}
const userReducer = (state = initialState, action) => {
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
            default:
                return state
        }
    }
;

export const followCreator = (userId) => {
    return {type: FOLLOW, userId}
}
export const unFollowActionCreator = (userId) => {
    return {type: UNFOLLOW, userId}
}

export default userReducer;