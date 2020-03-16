import React from 'react';
import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.messagesPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

        newMessage: (newMessageText) => {
            dispatch(addMessageActionCreator(newMessageText))


        }
    }
}

export default compose (connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect) (Dialogs)
