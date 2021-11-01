import { stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileTypes} from "../types/type";
import {usersAPI} from "../api/user-api";
import {profileAPI} from "../api/profile-api";
import { BaseThunkType, InferActionsTypes} from "./reduxStore";


let ADD_POST = 'ADD-POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE';
let SET_STATUS = 'SET_STATUS';
let DELETE = 'DELETE';
let SAVE_PHOTO = 'SAVE_PHOTO'



let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 4}
    ] as Array<PostsType>,
    profile: null as ProfileTypes | null,
    status: "" as string | null,
    newPostText: ""
};
type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {message: action.newPostText, likesCount: 0};
            return {...state, posts: [...state.posts, newPost], newPostText: ' '}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case SAVE_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actionsProfileReducer>
type ThunkType  = BaseThunkType<ActionsTypes>

export const actionsProfileReducer = {
    addPostActionCreator: (newPostText: string)=>  ({type: ADD_POST, newPostText}as const),
    deletePost: (postId: number)=>  {return {type: DELETE, postId}as const},
    setUserProfile: (profile: ProfileTypes)=>  {return {type: SET_USER_PROFILE, profile: profile}as const},
    savePhotoSucsess: (photos: PhotosType)=>  ({type: SAVE_PHOTO, photos: photos}as const),
    setStatus: (status: string)=>  ({type: SET_STATUS, status: status}as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) =>  {
    let response = await usersAPI.getProfile(userId)
    dispatch(actionsProfileReducer.setUserProfile(response.data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actionsProfileReducer.setStatus(response.data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(actionsProfileReducer.setStatus(status))
    }
}

export const savePhoto = (photos: string):ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(photos)

    if (response.data.resultCode === 0) {
        dispatch(actionsProfileReducer.savePhotoSucsess(response.data.data.photos
        ))
    }
}

export const saveProfile = (formData: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(formData)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}
export default profileReducer;