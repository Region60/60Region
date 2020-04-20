import React from 'react'
import {Field, reduxForm} from "redux-form";
import {createFields, Input} from "../common/FormsControls/FormsControls";
import {required} from "../utiles/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css"

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                {createFields('Email','email', [required],Input)}
                {createFields('Password','password', [required],Input, {type:"password"})}
                {createFields(null,'rememberMe', [],Input, {type:"checkbox"},'remember me')}

            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && createFields("symbol from image",'captcha', [],Input, )}

            {props.error &&
                <div className={classes.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/Profile'}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login)