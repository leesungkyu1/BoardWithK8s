import React, { useEffect } from "react";
import BoardDetail from "../../components/board/BoardDetail";
import { useDispatch, useSelector } from "react-redux";
import { boardDeleteAction, boardItemAction } from "../../modules/board";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";

const BoardDetailContainer = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const {title, content} = useSelector(({board}) => ({
        title: board.title,
        content: board.content
    }));

    const {token} = useSelector(({member}) => ({
        token: member.token
    }));

    useEffect(() => {
        dispatch(boardItemAction(id));
    }, [dispatch]);

    const onClickDeleteButton = () => {
        if(window.confirm("게시글을 삭제하시겠습니까?")){
            dispatch(boardDeleteAction(id));

            alert("게시글이 삭제되었습니다.");
            window.location.href = "http://localhost:3000";
        }
    };

    return <>
        <BoardDetail
            id={id}
            key={id}
            title={title}
            content={content}
            token={token}
            onClickDeleteButton={onClickDeleteButton}
        />
    </>;
};

export default BoardDetailContainer;