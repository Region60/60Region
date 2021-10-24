import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileTypes} from "../../types/type";
import {AppStateType} from "../../redux/reduxStore";



type PropsType = {
    authorizedUserId : () => void
    history: any
    getUserProfile: (userId:number) => void
    getStatus: (userId:number)=> void
    match: any
    profile: ProfileTypes
    status: string
    updateStatus: ()=> void
    savePhoto: () => void
}


class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {

            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }

        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (<Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}/>)
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto,saveProfile}),
    withRouter,
    withAuthRedirect)
(ProfileContainer)
