import React from "react"
import classes from "./ProfileInfo.module.css";
import style from "./../../common/FormsControls/FormsControls.module.css";
import {createFields, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import Button from "@material-ui/core/Button";

const ProfileDataForm = ({handleSubmit,profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><Button
            variant={"contained"}
            startIcon={<SaveRoundedIcon/>}
            size={"small"}
            onClick={()=> {}}>save</Button></div>
        {error&&<div className={style.formSummaryError}>{error}</div> }
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
            {createFields("About me", "aboutMe", [], Textarea,)}
        </div>
        <div className={classes.contactsUser}>
            <b>Contacts</b>:
            <div className={classes.contacts}>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={classes.contacts}>
                        <b>{key}: {createFields(key, "contacts." + key, [], Input)}</b>
                    </div>
                })}
            </div>
        </div>
        ava - description
    </form>
}
const ProfileDataFormReduxForm = reduxForm ({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm


