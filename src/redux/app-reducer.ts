import {getAuthUserData} from "./auth-reducer";

let INITIALISED_SUCCESS = 'INITIALISED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false

}
 const appReducer = (state: InitialStateType = initialState, action: InitializedSuccessActionType): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof INITIALISED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALISED_SUCCESS,
})

export const initializeApp = () =>async (dispatch: any) => {
    let promise = await dispatch (getAuthUserData())
    Promise.all ([promise])
        .then(()=> {
            dispatch(initializedSuccess())
    })
}



export default appReducer;