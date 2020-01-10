import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/state";
const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} ava={d.ava}/>)

    let newMessageElement = React.createRef();

    let newMessage = () => {
        let text = newMessageElement.current.value;
        props.dispatch(addMessageActionCreator(text));
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    }

    let messagesElements = props.state.messages
        .map(m => <Message message={m.message}/>)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div className={classes.messages2}>
                    {messagesElements}
                </div>
                <div className={classes.inputWindow}>
                    <div>
                        <textarea onChange={onMessageChange}
                                  ref={newMessageElement}
                                  value={props.state.newMessageText}/>
                        <div>
                            <button onClick={newMessage}>send</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Dialogs;