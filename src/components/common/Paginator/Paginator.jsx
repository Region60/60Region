import React, {useState} from 'react';
import classes from './Paginator.module.css'
import cn from "classnames"
import PaginatorInsertPageFormRedux from "../FormsControls/PaginatorInsertPageForm";
import {selectPage} from "../../../redux/users-reducer";

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    let goNumberPage = (value) => {
        let go = value.PaginatorInsertPage
        setPortionNumber(Math.floor(go / 10 + 1))
        onPageChanged(value.PaginatorInsertPage)
    }

    return <div className={classes.paginator}>

        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({[classes.selectedPage]: currentPage == p}, classes.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }
                             }>{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>NEXT</button>}
        <span className={classes.inputPage}>
        <PaginatorInsertPageFormRedux onSubmit={goNumberPage}/>
        </span>
    </div>
}


export default Paginator;