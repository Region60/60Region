import {getAuthUserData} from "./auth-reducer";

let INITIALISED_SUCCESS = 'INITIALISED_SUCCESS';


let initialState = {
    initialized: false

}
 const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALISED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


export const initializedSuccess = () => ({
    type: INITIALISED_SUCCESS,
})

export const initializeApp = () => (dispatch) => {
    let promise =  dispatch (getAuthUserData())
    Promise.all ([promise])
        .then(()=> {
            dispatch(initializedSuccess())
    })
}



export default appReducer;