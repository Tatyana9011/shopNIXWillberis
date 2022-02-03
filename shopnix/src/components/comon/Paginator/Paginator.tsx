import React, { useState } from 'react';
import s from './Paginator.module.css';

type PropsType = {
    currentPage:number
    totalCount:number | null
    pageSize:number
    onPageChanged: (page:number)=> void
    portionSize?:number
}

//currentPage-текущая страница
const Paginator: React.FC<PropsType> = ({
    currentPage, totalCount,
    pageSize, onPageChanged,
    portionSize = 2 }) => {
    if(totalCount===null) totalCount=10
    const pagesCount = Math.ceil(totalCount / pageSize); //узнаем сколько станиц вообще
    
    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    //portionSize сколько страниц отобажать юзеру
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.userButtonConteiner} >
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }} className={s.userButtonPrev} />}
            {
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <button key={p} onClick={() => { onPageChanged(p) }} className={
                            `${s.userButton}
                    ${currentPage === p && s.userButtonActive}`}> {p} </button>
                    })
            }
            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }} className={s.userButtonNext}></button>
            }
        </div>
    )
}


export default Paginator 