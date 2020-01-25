import React from 'react';
import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {

    return <div>
        <ProfileInfo/>
        <MyPostsContainer store={props.store}/>
    </div>
}
export default Profile;