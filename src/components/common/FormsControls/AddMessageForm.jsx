import {Field, reduxForm} from "redux-form";
import {createFields, CreateFields, Input, Textarea} from "./FormsControls";
import {maxLengthCreator, required} from "../../utiles/validators";
import React from "react";


const maxLength50 = maxLengthCreator(50)


const AddMessageForm = (props) => {
    return (                                               //вешаем обработчикна форм
        <form onSubmit={props.handleSubmit}>
            <div>
                {createFields('Enter your message', 'newMessageText', [required, maxLength50], Textarea)}
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