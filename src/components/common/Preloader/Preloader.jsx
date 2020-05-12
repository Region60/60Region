import React from 'react';
import pre from '../../../img/pre.gif'
import classes from './Preloader.module.css'

const Preloader = ()=> {
return <div className={classes.preloader}>
<img src={pre} alt='img'/>
</div>
}

export default Preloader;