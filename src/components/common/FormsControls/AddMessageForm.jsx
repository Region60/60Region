import {Field, reduxForm} from "redux-form";
import {Textarea} from "./FormsControls";
import {maxLengthCreator, required} from "../../utiles/validators";
import React from "react";

const maxLength50 = maxLengthCreator(50)


const AddMessageForm = (props) => {
    return (                                               //вешаем обработчикна форм
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength50]} name='newMessageText'
                       placeholder='Enter your message'/>
            </div>

            <div>
                <button>send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})   // оборачиваем AddMessageForm в reduxForm
(AddMessageForm)                                                        // и присваеваем уникальное имя "dialogAddMessageForm"

export default AddMessageFormRedux