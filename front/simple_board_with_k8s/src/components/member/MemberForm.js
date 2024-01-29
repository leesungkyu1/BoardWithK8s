import React from "react";
import { Form } from "../../../node_modules/react-bootstrap/esm/index";

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
        </Form>
    </>
};

export default MemberForm;