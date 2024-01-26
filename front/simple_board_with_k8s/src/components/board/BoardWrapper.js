import React from "react";
import { ListGroup } from "../../../node_modules/react-bootstrap/esm/index";

const BoardWrapper = ({children}) => {
    return <>
        <ListGroup as="ol" numbered>
            {children}
        </ListGroup>
    </>
};

export default BoardWrapper;