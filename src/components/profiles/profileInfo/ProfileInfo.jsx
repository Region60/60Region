import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
        <img src='http://rk.karelia.ru/wp-content/uploads/2016/05/More.jpg'></img>
            </div>
            <div className={classes.descriptionBlock}>
                <img src={(props.profile.photos.large)}/>
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