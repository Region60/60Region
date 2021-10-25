import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileTypes} from "../../types/type";
import {AppStateType} from "../../redux/reduxStore";


type MapStatePropsType = {
    status: string
    captchaUrl: string | null
    profile: ProfileTypes
    userId: number | null
    history:Array<string>
}

type MapDispatchPropsType = {
    authorizedUserId : () => void
    getUserProfile: (userId:number) => void
    getStatus: (userId:number)=> void
    match: any
    updateStatus: ()=> void
    savePhoto: () => void
}


class ProfileContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
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

    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
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


let mapStateToProps = (state: any): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto,saveProfile}),
    withRouter,
    withAuthRedirect)
(ProfileContainer)
