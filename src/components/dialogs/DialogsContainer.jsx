import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        dialosPage: state.dialosPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        newMessage: () => {
            dispatch(addMessageActionCreator())
        },
        onMessageChange: (text) => {
            dispatch(updateNewMessageTextActionCreator(text))
        }
    }
}


const DialogsContainer = connect(mapDispatchToProps, mapStateToProps)(Dialogs);

export default DialogsContainer;