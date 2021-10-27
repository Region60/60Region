import React from 'react'
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../utiles/validators"

type FormsControlPropsType = {
    meta: WrappedFieldMetaProps
}


export const FormControl: React.FC<FormsControlPropsType> = ({meta, children}) => { //реструкторизация rest оператор
    const hasError = meta.touched && meta.error;
    return (
        <div className = {styles.formControl + " " + (hasError? styles.error: "")}>
    <div>
        {children}
    </div>
    {hasError && <span>{meta.error} </span>}
    </div>
    )
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    //const {input, meta, child, ...restProps} = props
    return <FormControl {...props} > <textarea {...input}{...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta,...restProps} = props
    //const {input, meta, child, ...restProps} = props
    return <FormControl {...props} > <input {...input}{...restProps}/></ FormControl>
}


export function createFields<FormsKeysType extends string> (placeholder: string | undefined,
                             name: FormsKeysType,
                             validators: Array<FieldValidatorType>,
                             component: React.FC<WrappedFieldProps>,
                             props = {},
                             text = "")  {
    return    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        />{text}
    </div>
}