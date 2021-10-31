import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import {usersAPI} from "../api/user-api";
import {profileAPI} from "../api/profile-api";

let state = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 4}]
}

it(`new post should be added`, () => {
    let action = addPostActionCreator("TESTED TEXT")

    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(3)

})

it(`message new post should be "TESTED TEXT"`, () => {
    let action = addPostActionCreator("TESTED TEXT")

    let newState = profileReducer(state, action)

    expect (newState.posts[2].message).toBe('TESTED TEXT')
})


it(`after deleting length of messages shold de decrement`, () => {
    let action = deletePost(1)

    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(1)
})
