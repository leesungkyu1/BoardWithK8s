import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const BoardDetail = () => {
    return <>
        <div className="d-flex justify-content-around">
            <Card style={{ width: '100%' }} >
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                <Card.Title>제목</Card.Title>
                <Card.Text>
                    내용
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </>
};

export default BoardDetail;