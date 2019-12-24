import React from 'react';

import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./profileInfo/ProfileInfo";


const Profile = (props) => {
    return <div>
        <ProfileInfo/>
        <MyPosts posts = {props.state.posts} addPost = {props.addPost} />
    </div>
}
export default Profile;