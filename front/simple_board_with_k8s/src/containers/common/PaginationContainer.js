import React from "react";
import Pagenation from "../../components/common/Pagination";
import { useDispatch, useSelector } from "react-redux";

const PagenationContainer = () => {
    const pageMoveClick = (page) => {
        window.location.href = `?page=${page}`;        
    };

    const {page, totalPages, first, last} = useSelector(({board}) => ({
        page: board.page + 1,
        totalPages: board.totalPages,
        first: board.first,
        last: board.last
    }));

    const calcPageFirstAndLastIndex = (page, totalPages) => {
        let pageObject = {
            first: 1,
            last: 0
        }

        if(totalPages <= 7){
            pageObject.last = totalPages;
        }else if(page + 7 > totalPages) {
            pageObject.first = totalPages - 7; 
            pageObject.last = totalPages;
        }else {
            pageObject.first = page - 3;
            pageObject.last = page + 3;
        }

        return pageObject;
    };

    return <>
        <Pagenation
            page={page}
            pageObject={calcPageFirstAndLastIndex(page, totalPages)}
            pageMoveClick={pageMoveClick}
        />
    </>
};

export default PagenationContainer;