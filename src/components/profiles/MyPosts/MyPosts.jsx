import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    return <div className={classes.myposts}>
        <textarea></textarea>
        <div className={classes.button}>
            <button>
                Send
            </button>
        </div>
        {postsElements}

    </div>
}
export default MyPosts;