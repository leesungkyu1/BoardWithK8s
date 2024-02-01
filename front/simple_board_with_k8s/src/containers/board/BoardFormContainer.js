import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardForm from "../../components/board/BoardForm";

const BoardFormContainer = () => {
    const dispatch = useDispatch();

    const {seq, title, content} = useSelector((board) => ({
        board: board.board
    }));

    return <>
        <BoardForm
            key={seq}
            title={title}
            content={content}
        />
    </>;
};

export default BoardFormContainer;