import React from "react";
import Container from "../../../node_modules/react-bootstrap/esm/Container";
import Row from "../../../node_modules/react-bootstrap/esm/Row";
import Col from "../../../node_modules/react-bootstrap/esm/Col";

const Body = ({children}) => {
    return <>
        <Container>
            <Row>
                <Col></Col>
                <Col xs={10}>
                    {children}
                </Col>
                <Col></Col>
            </Row>
        </Container>
    </>
};

export default Body;
