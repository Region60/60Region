import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileTypes} from "../types/type";


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
    profile: null as PhotosType | null,
    status: "!!!!!!!" as string | null
};
export type InitialStateType = typeof initialState
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

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => {
    return {type: ADD_POST, newPostText}
}
type DeletePostType = {
    type: typeof DELETE
    postId: number
}
export const deletePost = (postId: number): DeletePostType => {
    return {type: DELETE, postId}
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileTypes
}
export const setUserProfile = (profile: ProfileTypes): SetUserProfileType => {
    return {type: SET_USER_PROFILE, profile: profile}
}
type savePhotosSucsessType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}
export const savePhotoSucsess = (photos: PhotosType): savePhotosSucsessType => {
    return {type: SAVE_PHOTO, photos: photos}
}


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await
        usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))

}
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => {
    return {type: SET_STATUS, status: status}
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (photos: string) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(photos)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucsess(response.data.data.photos
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