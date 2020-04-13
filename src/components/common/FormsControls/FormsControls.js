import React from 'react';
import classes from './FormsControls.module.css';
import {Field} from "redux-form";

export const FormControl = ({input, meta, ...props}) => { //реструкторизация rest оператор
    const hasError = meta.touched && meta.error;
    return (
        <div className={classes.formControl + "" + (hasError ? classes.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...props}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createFields = (placeholder, name, validators, components, props, text ='') => (
    <div>
        <Field validate={validators} placeholder={placeholder} name={name} component={components} {...props}/>
        {text}
    </div>
)