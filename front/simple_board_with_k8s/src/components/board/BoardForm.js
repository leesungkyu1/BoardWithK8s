import React from "react";
import { Form } from "../../../node_modules/react-bootstrap/esm/index";
import Button from 'react-bootstrap/Button';

const BoardForm = ({id, title, content, boardFormButtonEvent, onChangeValue}) => {
    return <>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>제목</Form.Label>
                <Form.Control 
                    value={title} 
                    type="email" 
                    placeholder="제목을 입력해주세요." 
                    name="title"
                    onChange={(e) => onChangeValue(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>내용</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={10} 
                    value={content}
                    name="content"
                    onChange={(e) => onChangeValue(e)}
                />
            </Form.Group>
            <div style={{display: "flex", flexDirection: "row-reverse"}}>
                {id ? 
                    <Button 
                        variant="outline-success" 
                        onClick={() => boardFormButtonEvent({id, title, content})}>
                            수정
                    </Button> : 
                    <Button 
                        variant="outline-success"
                        onClick={() => boardFormButtonEvent({id, title, content})}>
                            작성
                    </Button>
                } 
            </div>
        </Form>
    </>
};

export default BoardForm;