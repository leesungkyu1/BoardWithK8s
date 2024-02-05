import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const BoardDetail = ({id, title, content, token, onClickDeleteButton}) => {

    const boradDetailLink = {
        boardUpdate: `http://localhost:3000/boardForm/`,
    };

    return <>
        <div className="d-flex justify-content-around">
            <Card style={{ width: '100%' }} >
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {content}
                    </Card.Text>
                    <div style={{display: "flex", flexDirection: "row-reverse"}}>
                        {token && <>
                            <Button variant="outline-success" href={boradDetailLink.boardUpdate + id}>수정</Button>
                            <Button variant="outline-success" onClick={(e) => onClickDeleteButton()}>삭제</Button>
                        </>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    </>
};

export default BoardDetail;