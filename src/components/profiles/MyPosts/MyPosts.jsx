import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef()

    let addPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text)
    }

    return <div className={classes.myposts}>
        <textarea ref={newPostElement}></textarea>
        <div className={classes.button}>
            <button onClick={addPost}>
                Send
            </button>
        </div>
        {postsElements}

    </div>
}
export default MyPosts;