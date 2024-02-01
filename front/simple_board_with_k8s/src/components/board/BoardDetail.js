import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const BoardDetail = ({seq, title, content}) => {
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
                        <Button variant="outline-success">수정</Button>
                        <Button variant="outline-success">삭제</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </>
};

export default BoardDetail;