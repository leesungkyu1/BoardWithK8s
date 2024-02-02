import React from "react";
import Badge from "../../../node_modules/react-bootstrap/esm/Badge";
import { ListGroup } from "../../../node_modules/react-bootstrap/esm/index";

const BoardItem = ({id, title, createDate, postViewCnt}) => {
    return <>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                {createDate}
            </div>
            <Badge bg="primary" pill>
                {postViewCnt}
            </Badge>
        </ListGroup.Item>
    </>
};

export default BoardItem;