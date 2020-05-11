import React from 'react';
import styles from './FormsControls.module.css';
import {Field} from "redux-form";
import cn from "classnames"


export const FormControl = ({input, meta,child, ...props}) => { //реструкторизация rest оператор
    const hasError = meta.touched && meta.error;
    return (
        <span className={cn(styles.formControl,{[styles.error]:hasError})}>
            <span>
                {props.children}
            </span>
            {hasError && <span>{meta.error}</span>}
        </span>
    )
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createFields = (placeholder, name, validators, components, props, text ='') => (
    <span>
        <Field validate={validators} placeholder={placeholder} name={name} component={components} {...props}/>
        {text}
    </span>
)