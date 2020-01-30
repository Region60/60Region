import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";


const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} ava={d.ava}/>)
    let newMessageElement = React.createRef();

    let newMessage = () => {
        props.newMessage();
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.onMessageChange(text);
    }

    let messagesElements = props.dialogsPage.messages
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
                                  value={props.newMessageText}/>
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