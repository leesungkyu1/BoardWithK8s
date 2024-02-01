import React from "react";
import { Form } from "../../../node_modules/react-bootstrap/esm/index";
import Button from 'react-bootstrap/Button';

const BoardForm = ({title, content}) => {
    return <>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>제목</Form.Label>
                <Form.Control value={title} type="email" placeholder="제목을 입력해주세요." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>내용</Form.Label>
                <Form.Control as="textarea" rows={10} value={content}/>
            </Form.Group>
            <div style={{display: "flex", flexDirection: "row-reverse"}}>
                <Button variant="outline-success">작성</Button>
                <Button variant="outline-success">수정</Button>
            </div>
        </Form>
    </>
};

export default BoardForm;