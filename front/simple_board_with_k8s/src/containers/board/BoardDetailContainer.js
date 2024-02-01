import React, { useEffect } from "react";
import BoardDetail from "../../components/board/BoardDetail";
import { useDispatch, useSelector } from "react-redux";
import { boardItemAction } from "../../modules/board";

const BoardDetailContainer = () => {
    const dispatch = useDispatch();

    const {seq, title, content} = useSelector((board) => ({
        board: board.board
    }));

    useEffect(() => {
        dispatch(boardItemAction(seq));
    }, [dispatch]);

    return <>
        <BoardDetail
            key={seq}
            title={title}
            content={content}
        />
    </>;
};

export default BoardDetailContainer;