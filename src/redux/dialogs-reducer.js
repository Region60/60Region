let ADD_MESSAGE = 'ADD_MESSAGE';
let UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

let initialState = {
    messages: [
        {id: 0, message: 'Hi'},
        {id: 1, message: 'How are you?'},
        {id: 2, message: 'Norm, a 4e?'},
        {id: 3, message: 'What?'},
        {id: 4, message: 'fck yeeee'}
    ],
    //newMessageText: 'vtf!!!',
    dialogs: [
        {id: 1, name: 'Andrey', ava: 'src/images/igra_5063.jpg'},
        {id: 2, name: 'Vasya', ava: '../../images/igra_5664.jpg'},
        {id: 3, name: 'Fedor', ava: 'http://localhost:3000/src/images/igra_mech_Assassins_Creed_21984.jpg'},
        {id: 4, name: 'Valera', ava: '../../images/igra_pistolet_11094.jpg'},
        {id: 5, name: 'Max', ava: '../../images/Mortal_Kombat_34217.jpg'}
    ]
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 10,
                message: action.newMessageText
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ' '
            }

        default:
            return state
    }
}

export const addMessageActionCreator = (newMessageText) => {
    return {type: ADD_MESSAGE, newMessageText}
}


export default dialogReducer;