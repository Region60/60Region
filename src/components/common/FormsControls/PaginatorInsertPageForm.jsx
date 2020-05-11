import {createFields, Textarea} from "./FormsControls";
import {maxLengthCreator, required} from "../../utiles/validators";
import React from "react";
import {reduxForm} from "redux-form";


const maxLength4 = maxLengthCreator(4)


const PaginatorInsertPageForm = (props) => {
    return (                                               //вешаем обработчикна форм
        <form onSubmit={props.handleSubmit}>
            <div>
                {createFields('Page', 'PaginatorInsertPage', [required, maxLength4], Textarea)}
            </div>
            <button>Go</button>
        </form>
    )
}


const PaginatorInsertPageFormRedux = reduxForm({form: "PaginatorInsertPageForm"})
(PaginatorInsertPageForm)

export default PaginatorInsertPageFormRedux