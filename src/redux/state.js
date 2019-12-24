let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hello', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 4}]
    },
    messagesPage: {
        messages: [
            {id: 0, message: 'Hi'},
            {id: 1, message: 'How are you?'},
            {id: 2, message: 'Norm, a 4e?'},
            {id: 3, message: 'What?'},
            {id: 4, message: 'fck yeeee'}
        ],
        dialogs: [
            {id: 1, name: 'Andrey', ava:'src/images/igra_5063.jpg'},
            {id: 2, name: 'Vasya', ava:'../../images/igra_5664.jpg'},
            {id: 3, name: 'Fedor', ava:'http://localhost:3000/src/images/igra_mech_Assassins_Creed_21984.jpg'},
            {id: 4, name: 'Valera', ava:'../../images/igra_pistolet_11094.jpg'},
            {id: 5, name: 'Max', ava:'../../images/Mortal_Kombat_34217.jpg'}
        ]
    },
    user: [
        {id: 0, name: 'Maxim', ava: ' '}
    ]

}
export default state;