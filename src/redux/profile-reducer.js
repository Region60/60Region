let UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
let ADD_POST = 'ADD-POST';

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 4}],
    newPostText: 'new Post'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                message: state.newPostText,
                likesCount: 0
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = ' ';
            return stateCopy;
        }
        case  UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state}

            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }

};

export const addPostActionCreator = () => {
    return {type: ADD_POST}
}

export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

export default profileReducer;