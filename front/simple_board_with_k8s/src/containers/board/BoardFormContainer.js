import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardForm from "../../components/board/BoardForm";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";
import { boardItemAction, boardUpdateAction, changeValue } from "../../modules/board";

const BoardFormContainer = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(() => {
        if(id){
            dispatch(boardItemAction(id));
        }
    }, [id, dispatch]);

    const {title, content} = useSelector(({board}) => ({
        title: board.title,
        content: board.content
    }));

    const onChangeValue = (e) => {
        const {name, value} = e.target;
        console.log(name);
        console.log(value);

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
        
        if(id){
            dispatch(boardUpdateAction({id, title, content}));
        }else{
            //dispatch(boardWrite({title, content}));
        }
    };

    return <>
        <BoardForm
            id={id}
            key={id}
            title={title}
            content={content}
            onChangeValue={onChangeValue}
            boardFormButtonEvent={boardFormButtonEvent}
        />
    </>;
};

export default BoardFormContainer;