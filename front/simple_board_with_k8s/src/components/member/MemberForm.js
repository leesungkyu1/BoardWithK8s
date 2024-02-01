import React from "react";
import { Form } from "../../../node_modules/react-bootstrap/esm/index";
import Button from 'react-bootstrap/Button';

const MemberForm = () => {
    return <>
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control type="email" placeholder="아이디를 입력하세요" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호를 입력하세요." />
            </Form.Group>
            <div style={{display: "flex", flexDirection: "row-reverse"}}>
                <Button variant="outline-success">로그인</Button>
                <Button variant="outline-success">회원가입</Button>
            </div>
        </Form>
    </>
};

export default MemberForm;