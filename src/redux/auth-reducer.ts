import {FormAction, stopSubmit} from "redux-form";
import {securityAPI} from "../api/security-api";
import {authAPI} from "../api/auth-api";
import {CaptchaRequiredEnum, ResultCodeEnum} from "../types/type";
import { BaseThunkType, InferActionsTypes} from "./reduxStore";

let SET_USER_DATE = 'SET_USER_DATE';
let SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';


let initialState = {
    userId: null as number|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false,
    captchaUrl: null as string|null
}
type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
        case SET_CAPTCHA_URL:

            return {...state, ...action.data}
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actionsAuthReducers>
type ThunkType  = BaseThunkType<ActionsTypes | FormAction>

const actionsAuthReducers ={
    setAuthUserData: (userId: number | null, email: string|null, login: string|null, isAuth: boolean)=> ({
        type: SET_USER_DATE,
        data: {userId, email, login, isAuth}
    }as const),
    setCaptchaUrl: (captchaUrl: string)=> ({
        type: SET_CAPTCHA_URL,
        data: {captchaUrl}
    }as const)
}



export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(actionsAuthReducers.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
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

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(actionsAuthReducers.setCaptchaUrl(captchaUrl))

}

export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actionsAuthReducers.setAuthUserData(null, null, null, false))
    }
}


export default authReducer;