import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/reduxStore";

class HeaderContainer extends React.Component {
    render() {
        // @ts-ignore
        return <Header {...this.props}/>
    }
}
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect (mapStateToProps, {logout})(HeaderContainer);