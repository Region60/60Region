import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";

let UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
let ADD_POST = 'ADD-POST';

let ADD_MESSAGE = 'ADD_MESSAGE';
let UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

let store = {
    /*_state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 4}],
            newPostText: 'new Post'
        },
        messagesPage: {
            messages: [
                {id: 0, message: 'Hi'},
                {id: 1, message: 'How are you?'},
                {id: 2, message: 'Norm, a 4e?'},
                {id: 3, message: 'What?'},
                {id: 4, message: 'fck yeeee'}
            ],
            newMessageText: 'vtf!!!',
            dialogs: [
                {id: 1, name: 'Andrey', ava: 'src/images/igra_5063.jpg'},
                {id: 2, name: 'Vasya', ava: '../../images/igra_5664.jpg'},
                {id: 3, name: 'Fedor', ava: 'http://localhost:3000/src/images/igra_mech_Assassins_Creed_21984.jpg'},
                {id: 4, name: 'Valera', ava: '../../images/igra_pistolet_11094.jpg'},
                {id: 5, name: 'Max', ava: '../../images/Mortal_Kombat_34217.jpg'}
            ]
        },
        user: [
            {id: 0, name: 'Maxim', ava: ' '}
        ]
    },*/
    _callSuscraiber() {
        console.log('state changet');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSuscraiber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogReducer(this._state.messagesPage, action);


        this._callSuscraiber(this._state);

    }
}
export const addPostActionCreator = () => {
    return {type: ADD_POST}
}

export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}
export const addMessageActionCreator = () => {
    return {type: ADD_MESSAGE}
}

export const updateNewMessageTextActionCreator = (text) => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, newText: text}
}

//export default store;
//window.store = store;