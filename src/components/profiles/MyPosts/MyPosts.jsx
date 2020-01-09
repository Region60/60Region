import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/state";



const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef()

    let addPost = () => {
        let text = newPostElement.current.value;
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewPostTextActionCreator(text));
    }

    return <div className={classes.myposts}>

        <textarea onChange={onPostChange}
                  ref={newPostElement}
        value={props.newPostText}/>

        <div className={classes.button}>

            <button onClick={addPost}>Send</button>

        </div>
        {postsElements}

    </div>
}
export default MyPosts;