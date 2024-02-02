import React from "react";
import { ListGroup } from "../../../node_modules/react-bootstrap/esm/index";
import BoardItem from "./BoardItem";

const BoardWrapper = ({boardList, boardDetailLinkEvent}) => {
    
    return <>
        <ListGroup as="ol" numbered>
            {boardList && (boardList.map(board => (
                <BoardItem
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    createDate={board.createDate}
                    postViewCnt={board.postViewCnt}
                    boardDetailLinkEvent={boardDetailLinkEvent}
                />
            )))}
        </ListGroup>
    </>
};

export default BoardWrapper;