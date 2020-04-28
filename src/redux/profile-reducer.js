import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";


let ADD_POST = 'ADD-POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE';
let SET_STATUS = 'SET_STATUS';
let DELETE = 'DELETE';
let SAVE_PHOTO = 'SAVE_PHOTO'


let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 4}],
    profile: null,
    status: "!!!!!!!"
};

const profileReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {

        case ADD_POST:
            let newPost = {message: action.newPostText, likesCount: 0};
            return {...state, posts: [...state.posts, newPost], newPostText: ' '}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
            return {...state, status: action.status}

        case DELETE:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        case SAVE_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => {
    return {type: ADD_POST, newPostText}
}
export const deletePost = (postId) => {
    return {type: DELETE, postId}
}
export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile: profile}
}
export const savePhotoSucsess = (photos) => {
    return {type: SAVE_PHOTO, photos: photos}
}


export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const setStatus = (status) => {
    return {type: SET_STATUS, status: status}
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucsess(response.data.data.photos
        ))
    }
}

export const saveProfile = (formData) => async (dispatch,getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(formData)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}


export default profileReducer;