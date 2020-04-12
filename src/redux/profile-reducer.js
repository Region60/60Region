import {profileAPI, usersAPI} from "../api/api";

let ADD_POST = 'ADD-POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE';
let SET_STATUS = 'SET_STATUS';
let DELETE = 'DELETE';

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 4}],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POST:
            let newPost = {message: action.newPostText, likesCount: 0};
            return {...state, posts: [...state.posts, newPost], newPostText: ' '}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
            return {...state, status: action.status}

        case DELETE:
            return {...state, posts: state.posts.filter(p =>p.id != action.postId)}

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
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}


export default profileReducer;