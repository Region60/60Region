import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {reset} from 'redux-form'
type StateType = {
    messagesPage: number
}

let mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.messagesPage,
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        newMessage: (newMessageText: string) => {
            dispatch(addMessageActionCreator(newMessageText))
            dispatch(reset('dialogAddMessageForm'))

        }
    }
}

export default compose (connect(mapStateToProps, mapDispatchToProps), withAuthRedirect) (Dialogs)
