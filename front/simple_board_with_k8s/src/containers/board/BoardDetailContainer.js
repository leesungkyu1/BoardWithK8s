import React, { useEffect } from "react";
import BoardDetail from "../../components/board/BoardDetail";
import { useDispatch, useSelector } from "react-redux";
import { boardItemAction } from "../../modules/board";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";

const BoardDetailContainer = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const {title, content} = useSelector(({board}) => ({
        title: board.title,
        content: board.content
    }));

    useEffect(() => {
        dispatch(boardItemAction(id));
    }, [dispatch]);

    return <>
        <BoardDetail
            id={id}
            key={id}
            title={title}
            content={content}
        />
    </>;
};

export default BoardDetailContainer;