import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";


const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    let newPostElement = React.createRef();

    return (
        <div className={classes.myposts}>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            {postsElements}
        </div>
    )
}

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
            <Field name='newPostText' component='textarea'/>
            </div>
            <div className={classes.button}>
                <button>Send</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;