let UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
let ADD_POST = 'ADD-POST';

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
        let newPost = {
            message: state.newPostText,
            likesCount: 0
        }
        state.posts.push(newPost);
        state.newPostText = ' '
            return state
        case UPDATE_NEW_POST_TEXT:
        state.newPostText = action.newText;
            return state
        default:
            return state;
    }

};
export default profileReducer;