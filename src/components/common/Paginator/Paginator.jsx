import React, {useState} from 'react';
import classes from './Paginator.module.css'
import cn from "classnames"
import PaginatorInsertPageFormRedux from "../FormsControls/PaginatorInsertPageForm";

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
        if (!isNaN(+go)) {
        setPortionNumber(Math.floor(go / 10 + 1))
        onPageChanged( + go)} else {
            alert  (`${go} - не является числовым значением`)
        }
    }

    return <div className={classes.paginator}>
        <div className={classes.pagesWithButtons} >
            {portionNumber > 1 &&
            <span onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>. . . </span>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={cn({[classes.selectedPage]: currentPage === p}, classes.pageNumber)}
                                 key={p}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }
                                 }>{p}</span>
                })}
            {portionCount > portionNumber &&
            <span onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}> . . .</span>}
        </div>
        <div className={classes.inputPage}>
            <PaginatorInsertPageFormRedux onSubmit={goNumberPage}/>
        </div>
    </div>
}


export default Paginator;