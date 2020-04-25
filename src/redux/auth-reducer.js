import {authAPI, securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

let SET_USER_DATE = 'SET_USER_DATE';
let SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}
const authReducer = (state = initialState, action) => {
        switch (action.type) {
        case SET_USER_DATE:
        case SET_CAPTCHA_URL:

            return {...state, ...action.data}
              default:
            return state
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATE,
    data: {userId, email, login, isAuth}
})

export const setCaptchaUrl = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    data: {captchaUrl}

})

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {

    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))

}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {

        dispatch(getAuthUserData(dispatch(setAuthUserData(null, null, null, false))))
    }
}


export default authReducer;