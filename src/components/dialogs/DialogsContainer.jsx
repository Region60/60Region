import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/store";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {

    return <StoreContext.Consumer>
        { (store) => {
            let state = store.getState();

            let newMessage = () => {
                store.dispatch(addMessageActionCreator());
            }

            let onMessageChange = (text) => {
                store.dispatch(updateNewMessageTextActionCreator(text));
            }
            return <Dialogs dialogs={state.messagesPage.dialogs}
                            messages={state.messagesPage.messages}
                            newMessage={newMessage}
                            onMessageChange={onMessageChange}/>
        }
        }
    </StoreContext.Consumer>

}

export default DialogsContainer;