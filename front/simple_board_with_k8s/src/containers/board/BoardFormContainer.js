import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardForm from "../../components/board/BoardForm";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";
import { boardInsertAction, boardItemAction, boardUpdateAction, changeValue, initForm } from "../../modules/board";
import { getIdFromToken } from "../../lib/util/jwtToken";

const BoardFormContainer = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(() => {
        if(id){
            dispatch(boardItemAction(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if(!id){
            dispatch(initForm());
        }
    }, [id, dispatch]);

    const {title, content} = useSelector(({board}) => ({
        title: board.title,
        content: board.content
    }));

    const onChangeValue = (e) => {
        const {name, value} = e.target;

        dispatch(changeValue({key: name, value}));
    };

    const boardFormButtonEvent = ({title, content, id}) => {
        if(!title){
            alert("제목을 입력하세요.");
            return;
        }else if(!content){
            alert("내용을 입력하세요.");
            return;
        }

        const userIdx = getIdFromToken();
        let boardMessage = "";
        
        if(id){
            dispatch(boardUpdateAction({userIdx, id, title, content}));

            boardMessage = "수정";
        }else{
            dispatch(boardInsertAction({userIdx, title, content}));

            boardMessage = "등록";
        }

        alert(`게시글이 ${boardMessage}되었습니다.`);
        window.location.href = "http://localhost:3000";
    };

    return <>
        <BoardForm
            id={id}            
            title={title}
            content={content}
            onChangeValue={onChangeValue}
            boardFormButtonEvent={boardFormButtonEvent}
        />
    </>;
};

export default BoardFormContainer;