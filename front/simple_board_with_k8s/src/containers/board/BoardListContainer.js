import React, { useEffect } from "react";
import BoardWrapper from "../../components/board/BoardWrapper";
import { useDispatch, useSelector } from "react-redux";
import { boardListAction } from "../../modules/board";
import { useSearchParams } from "../../../node_modules/react-router-dom/dist/index";

const BoardListContainer = () => {
    const [searchParams, setSearchParames] = useSearchParams();
    const page = searchParams.get("page");

    const dispatch = useDispatch();

    const {boardList} = useSelector((board) => ({
        boardList: board.boardList
    }));

    useEffect(() => {
        dispatch(boardListAction(page));
    }, [dispatch]);

    return <>
        <BoardWrapper
            boardList={boardList}
        />
    </>
};

export default BoardListContainer;