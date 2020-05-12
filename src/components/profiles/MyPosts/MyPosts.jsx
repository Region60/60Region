import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utiles/validators.js";
import {Textarea} from "../../common/FormsControls/FormsControls.js";

let maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} validate={[required, maxLength10]} placeholder={'Post message'} />
            </div>
            <div className={classes.button}>
                <button>Send</button>
            </div>
        </form>
    )
}

const MyPosts = React.memo(props => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }


    return (
        <div className={classes.myposts}>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            {postsElements}
        </div>
    )
})

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;