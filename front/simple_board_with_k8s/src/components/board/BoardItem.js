import React from "react";
import Badge from "../../../node_modules/react-bootstrap/esm/Badge";
import { ListGroup } from "../../../node_modules/react-bootstrap/esm/index";

const BoardItem = () => {
    return <>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
            </div>
            <Badge bg="primary" pill>
                14
            </Badge>
        </ListGroup.Item>
    </>
};

export default BoardItem;