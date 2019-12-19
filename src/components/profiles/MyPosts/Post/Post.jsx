import React from 'react';
import classes from './Post.module.css';


const Post = (props) => {
  return <div className={classes.post}>
    <img src = 'https://cm1.narvii.com/7105/0f7c0ae6d553a5057a8a095e56f130d3a20ff427_120.jpg'></img>
         {props.message}
         <div>
         <span>Like</span> {props.likeCount}
         </div>
  </div>
}
export default Post;