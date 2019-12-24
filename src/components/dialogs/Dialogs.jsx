import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";

const Dialogs = (props) => {


    let dialogsElements = props.state.dialogs
        .map(d => <DialogItem name={d.name} id={d.id} ava={d.ava}/>)


    let messagesElements = props.state.messages
        .map(m => <Message message={m.message}/>)

    let newMessageElement = React.createRef();
    let newMessage = () => {
        let text = newMessageElement.current.value;
        alert(text);
    }


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsElements}

            </div>
            <div className={classes.messages}>
                <div>
                    {messagesElements}
                </div>
                <div className={classes.textArea}>
                    <textarea ref={newMessageElement}></textarea>

                    <button onClick={newMessage}>send</button>
                </div>
            </div>

        </div>
    )
}
export default Dialogs;