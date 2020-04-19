import React from "react"
import classes from "./ProfileInfo.module.css";
import {createFields, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit,profile}) => {

    return <form onSubmit={handleSubmit}>
        <div>
            <button onClick={()=> {}}>save</button>
        </div>
        <div>
            <b>Full Name</b> : {createFields("Full name", "fullName", [], Input)}
        </div>
       <div>
            <b>Lookink for a job</b>:
            {createFields("", "lookingForAJob", [], Input, {type:"checkbox"})}
        </div>
        <div>
            <b>My professional skills</b>:
            {createFields("My professional skills", "lookingForAJobDescription", [], Textarea,)}
        </div>
        <div>
            <b>About me</b>:
            {createFields("About me", "about me", [], Textarea,)}
        </div>
        <div className={classes.contactsUser}>
            <b>Contacts</b>:
            <div className={classes.contacts}>
                {/*{Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={props.profile.contacts[key]}/>
                })}*/}
            </div>
        </div>
        ava - description
    </form>
}
const ProfileDataFormReduxForm = reduxForm ({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm


