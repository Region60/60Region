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
                     ava - description
            </div>
    </div>
    )
}
export default ProfileInfo;