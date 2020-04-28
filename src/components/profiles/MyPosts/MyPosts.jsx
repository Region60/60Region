import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utiles/validators.js";
import {Textarea} from "../../common/FormsControls/FormsControls.js";
import Button from "@material-ui/core/Button";

let maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} validate={[required, maxLength10]} placeholder={'Post message'} />
            </div>
            <div className={classes.button}>
                <Button
                    variant={"contained"}
                    size={"small"}>Send</Button>
            </div>
        </form>
    )
}

const MyPosts = React.memo(props => {
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
})

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;