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
        
        if(id){
            dispatch(boardUpdateAction({id, title, content}));
        }else{
            console.log(userIdx);

            dispatch(boardInsertAction({userIdx, title, content}));

            alert("게시글이 등록되었습니다.");

            window.location.href = "http://localhost:3000";
        }
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