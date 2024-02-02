import React, { useEffect } from "react";
import BoardWrapper from "../../components/board/BoardWrapper";
import { useDispatch, useSelector } from "react-redux";
import { boardListAction } from "../../modules/board";
import { useSearchParams } from "../../../node_modules/react-router-dom/dist/index";

const BoardListContainer = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ? searchParams.get("page") - 1: 0;

    const dispatch = useDispatch();

    const {boardList} = useSelector(({board}) => ({
        boardList: board.boardList
    }));

    useEffect(() => {
        dispatch(boardListAction(page));
    }, [page, dispatch]);

    const boardDetailLink = (id) => {
        console.log("a");

        window.location.href = `/boardDetail/${id}`;
    };

    return <>
        <BoardWrapper
            boardList={boardList}
            boardDetailLinkEvent={boardDetailLink}
        />
    </>
};

export default BoardListContainer;