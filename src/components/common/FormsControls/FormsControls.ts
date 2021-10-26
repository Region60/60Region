import React from 'react';
import styles from './FormsControls.module.css';
import {Field} from "redux-form";
import {FieldValidatorType} from "../../utiles/validators";

type FormsControlParamsType = {
    meta: {
        touched: boolean
        error: string
    },
    child: React.ReactNode
}
type FormControlType = (params:FormsControlParamsType)=>React.ReactNode


export const FormControl: React.FC<FormsControlParamsType> = ({meta, child}) => { //реструкторизация rest оператор
    const hasError = meta.touched && meta.error;
    return (
        <div className = {styles.formControl + " " + (hasError? styles.error: "")}>
    <div>
        {child}
    < /div>
    {hasError && <span>{meta.error} < /span>}
    < /div>
    )
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props} > <textarea {...input}
    {...
        restProps
    }
    /></
    FormControl >
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props} > <input {...input}
    {...
        restProps
    }
    /></
    FormControl >
}

export const createFields = (placeholder: string ,
                             name: string,
                             validators: Array<FieldValidatorType>,
                             component: string | React.Component | React.FC,
                             props = {},
                             text = '') => (
    <div>
        <Field validate = {validators} placeholder = {placeholder} name = {name} component = {component}{...props}/>
{
    {text}
}
</div>
)