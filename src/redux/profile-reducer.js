import {profileAPI, usersAPI} from "../api/api";

let UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
let ADD_POST = 'ADD-POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE';
let SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 4}],
    newPostText: 'new Post',
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POST:
            let newPost = {message: state.newPostText, likesCount: 0};
            return {...state, posts: [...state.posts, newPost], newPostText: ' '}

        case  UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
            return {...state, status: action.status}

        default:
            return state;
    }
}


export const addPostActionCreator = () => {
    return {type: ADD_POST}
}

export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}
export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile: profile}
}

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const setStatus = (status) => {
    return {type: SET_STATUS, status: status}
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(response.data))
        }
    })
}


export default profileReducer;