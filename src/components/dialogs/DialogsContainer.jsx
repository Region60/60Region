import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/store";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {

    let state = props.store.getState();

    let newMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }

    let onMessageChange = (text) => {
        props.dispatch(updateNewMessageTextActionCreator(text));
    }

    return (<Dialogs dialogs={state.messagesPage.dialogs}
                     messages={state.messagesPage.messages}
                     newMessage={newMessage}
                     onMessageChange={onMessageChange}/>)

}

export default DialogsContainer;