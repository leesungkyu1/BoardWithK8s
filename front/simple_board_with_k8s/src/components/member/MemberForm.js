import React from "react";
import { Form } from "../../../node_modules/react-bootstrap/esm/index";
import Button from 'react-bootstrap/Button';

const MemberForm = ({joinFormSw}) => {
    return <>
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control name="userId" type="email" placeholder="아이디를 입력하세요" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control name="userPw" type="password" placeholder="비밀번호를 입력하세요." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>이름</Form.Label>
                <Form.Control name="userName" type="text" placeholder="이름을 입력하세요." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>핸드폰번호</Form.Label>
                <Form.Control name="userPhone" type="text" placeholder="핸드폰번호를 입력하세요." />
            </Form.Group>
            <div style={{display: "flex", flexDirection: "row-reverse"}}>
                {joinFormSw ? 
                    <Button variant="outline-success">회원가입</Button> : 
                    <Button variant="outline-success">로그인</Button>
                }
            </div>
        </Form>
    </>
};

export default MemberForm;