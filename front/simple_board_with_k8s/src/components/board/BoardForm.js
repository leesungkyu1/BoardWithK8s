import React from "react";
import { Form } from "../../../node_modules/react-bootstrap/esm/index";

const BoardForm = () => {
    return <>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>제목</Form.Label>
                <Form.Control type="email" placeholder="제목을 입력해주세요." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>내용</Form.Label>
                <Form.Control as="textarea" rows={10} />
            </Form.Group>
        </Form>
    </>
};

export default BoardForm;