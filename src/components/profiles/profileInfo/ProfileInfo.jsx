import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userImg from '../../../img/userImg.png'
import ProfileStatus from './Profilestatus'
import ProfileStatusWithHook from "./ProfileStatusрHook";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto (e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img src='http://rk.karelia.ru/wp-content/uploads/2016/05/More.jpg'></img>
                {props.isOwner && <input type ={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            <div className={classes.descriptionBlock}>
                <img src={(props.profile.photos.large == null? userImg : props.profile.photos.large )} className={classes.photo}/>

                <div>Name - {props.profile.fullName}</div>
                <ProfileStatusWithHook status ={props.status} updateStatus={props.updateStatus}/>
                <div className={classes.contactsUser}>
                    <div className={classes.contacts}>Contacts</div>
                    <div>Facebook -{props.profile.contacts.facebook}</div>
                    <div>Website -{props.profile.contacts.website}</div>
                    <div>Vkontakte -{props.profile.contacts.vk}</div>
                    <div>Twittwer -{props.profile.contacts.twitter}</div>
                    <div>Instagram -{props.profile.contacts.instagram}</div>
                    <div>Youtube -{props.profile.contacts.youtube}</div>
                    <div>Github -{props.profile.contacts.github}</div>
                    <div>Mainlink -{props.profile.contacts.mainlink}</div>
                </div>
                ava - description
            </div>
        </div>
    )
}
export default ProfileInfo;