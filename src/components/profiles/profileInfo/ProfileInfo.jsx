import React, {useState} from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userImg from '../../../img/userImg.png'
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [editeModePhoto, setEditModePhoto] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
            setEditModePhoto(false)
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return (
        <div>
            {/*<div>*/}
            {/*    <img src='http://rk.karelia.ru/wp-content/uploads/2016/05/More.jpg'></img>*/}
            {/*</div>*/}

            <div className={classes.descriptionBlock} onClick={() => editeModePhoto && setEditModePhoto(false)}>
                <img src={props.profile.photos.large == null ? userImg : props.profile.photos.large}
                     className={classes.photo} onClick={() => setEditModePhoto(true)}/>
                {editeModePhoto &&
                props.isOwner &&
                <div>
                    <input type={"file"} onChange={onMainPhotoSelected}/>
                </div>}
                {editMode ?
                    <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}
                                     status={props.status} updateStatus={props.updateStatus}/>
                    : <ProfileData editeModeEctiveted={() => {
                        setEditMode(true)
                    }} isOwner={props.isOwner} profile={props.profile} status={props.status}
                                   updateStatus={props.updateStatus}/>}
            </div>
        </div>
    )
}

const ProfileData = (props) => {
    return <div className={classes.info}>
        {props.isOwner && <div>
            <button onClick={props.editeModeEctiveted}>edit</button>
        </div>}
        <div>
            <b>Name</b> - {props.profile.fullName}
        </div>
        <div className={classes.status}>
            <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>
        </div>
        <div>
            <b>Lookink for a job</b>: {props.profile.lookingForAJob}
        </div>
        <div>
            <b>Professional slills</b>: {props.profile.lookingForAJobDescription}

        </div>
        <div>
            <b>About me</b>: {props.profile.aboutMe}
        </div>
        <div className={classes.contactsUser}>
            <b>Contacts</b>:
            <div className={classes.line}>
                <div className={classes.contacts}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key}
                                        contactValue={props.profile.contacts[key]}/>
                    })}
                </div>
            </div>
        </div>
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;