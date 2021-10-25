import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createFields, Input} from "../common/FormsControls/FormsControls";
import {required} from "../utiles/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/reduxStore";


type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null

}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValueType = {
    captcha: string
    rememberMe: boolean
    email: string
    password:string
}

type LoginFormOwnProps = {
    captchaUrl: string | null

}

const LoginForm: React.FC<InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps>  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createFields('Email', 'email', [required], Input,{})}
            {createFields('Password', 'password', [required], Input, {type: "password"})}
            {createFields(null,'rememberMe', [],Input, {type:"checkbox"},'remember me')}

            {props.captchaUrl && <img src={props.captchaUrl} alt='img'/>}
            {props.captchaUrl && createFields("symbol from image", 'captcha', [], Input,{})}

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

const LoginReduxForm = reduxForm<LoginFormValueType,LoginFormOwnProps>({form: 'login'})(LoginForm)


const Login:  React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValueType) => {
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


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login)