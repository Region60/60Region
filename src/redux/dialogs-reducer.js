let ADD_MESSAGE = 'ADD_MESSAGE';
let UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';


const dialogReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 10,
                message: state.newMessageText
            };
            state.messages.push(newMessage)
            state.newMessageText = ' '
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state
        default:
            return state
    }
}

export default dialogReducer;