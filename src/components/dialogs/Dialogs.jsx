import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {Redirect} from "react-router-dom";
import AddMessageFormRedux from "../common/FormsControls/AddMessageForm";


const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}
                                                                         ava={d.ava}/>)

    let addNewMessage = (value) => {                //принимает объект собранные из формы, а называться свойства будут
        props.newMessage(value.newMessageText);    // как name  у Field Field и передает его в ectionCreator
    }

    let messagesElements = props.dialogsPage.messages

        .map(m => <Message message={m.message}/>)

    if (!props.isAuth) return <Redirect to={'/login'}/>

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
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>

        </div>
    )
}


export default Dialogs;