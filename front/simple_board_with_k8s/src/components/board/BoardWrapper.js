import React from "react";
import { ListGroup } from "../../../node_modules/react-bootstrap/esm/index";
import BoardItem from "./BoardItem";

const BoardWrapper = ({boardList}) => {
    return <>
        <ListGroup as="ol" numbered>
            {boardList && (boardList.map(board => {
                <BoardItem
                    key={board.seq}
                    title={board.title}
                    content={board.content}
                />
            }))}
        </ListGroup>
    </>
};

export default BoardWrapper;