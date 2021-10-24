import {authAPI, CaptchaRequiredEnum, ResultCodeEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

let SET_USER_DATE = 'SET_USER_DATE';
let SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

export type InitialStateType2 = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
let initialState = {
    userId: null as number|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false,
    captchaUrl: null as string|null
}
export type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
        case SET_CAPTCHA_URL:

            return {...state, ...action.data}
        default:
            return state
    }
}


type SetAuthUserDataActionDataType = {
    userId: number|null
    email: string|null
    login: string|null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATE
    data: SetAuthUserDataActionDataType
}
export const setAuthUserData = (userId: number | null, email: string|null, login: string|null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATE,
    data: {userId, email, login, isAuth}
})

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    data: {captchaUrl:string}

}
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    data: {captchaUrl}

})


export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch:any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === CaptchaRequiredEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {

    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))

}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {

        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default authReducer;