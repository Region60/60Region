import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {reset} from 'redux-form'

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.messagesPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

        newMessage: (newMessageText) => {
            dispatch(addMessageActionCreator(newMessageText))
            dispatch(reset('dialogAddMessageForm'))

        }
    }
}

export default compose (connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect) (Dialogs)
