import React from "react";
import Container from "../../../node_modules/react-bootstrap/esm/Container";
import Row from "../../../node_modules/react-bootstrap/esm/Row";
import Col from "../../../node_modules/react-bootstrap/esm/Col";

const Body = ({children}) => {
    return <>
        <Container>
            <Row>
                <Col>여백</Col>
                <Col xs={10}>
                    {children}
                </Col>
                <Col>여백</Col>
            </Row>
        </Container>
    </>
};

export default Body;
