import React from 'react';
import classes from './ProfileInfo.module.css';



const ProfileInfo = () => {
    return (
        <div>
            <div>
        <img src='http://rk.karelia.ru/wp-content/uploads/2016/05/More.jpg'></img>
            </div>
            <div className={classes.descriptionBlock}>
                     ava - description
            </div>
    </div>
    )
}
export default ProfileInfo;