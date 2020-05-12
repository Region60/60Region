import {createFields, Textarea} from "./FormsControls";
import React from "react";
import {reduxForm} from "redux-form";
import classes from '../Paginator/Paginator.module.css'





const PaginatorInsertPageForm = (props) => {
    return (                                               //вешаем обработчикна форм
        <form onSubmit={props.handleSubmit}>
            <div className={classes.insertPageForm}>
            <div className={classes.paginatorTextarea}>
                {createFields('Page', 'PaginatorInsertPage', [], Textarea)}
            </div>
            <button>Go</button>
            </div>
        </form>
    )
}


const PaginatorInsertPageFormRedux = reduxForm({form: "PaginatorInsertPageForm"})
(PaginatorInsertPageForm)

export default PaginatorInsertPageFormRedux