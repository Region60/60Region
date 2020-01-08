let store = {
    _state: {
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
    },
    _callSuscraiber() {
        console.log('state changet');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSuscraiber = observer;
    },

    addMessage() {
        let newMessage = {
            id: 10,
            message: this._state.messagesPage.newMessageText
        }
        this._state.messagesPage.messages.push(newMessage)
        this._state.messagesPage.newMessageText = ' '
        this._callSuscraiber(this._state);
    },
    updateNewMessageText(newText) {
        this._state.messagesPage.newMessageText = newText;
        this._callSuscraiber(this._state);
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost = {
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ' '
            this._callSuscraiber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT')  {
            this._state.profilePage.newPostText = action.newText;
            this._callSuscraiber(this._state);
        }
    }

}
export default store;
window.store = store;