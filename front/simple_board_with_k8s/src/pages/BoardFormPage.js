import React from "react";
import Header from "../components/common/Header";
import Body from "../components/common/Body";
import BoardForm from "../components/board/BoardForm";

const BoardFormPage = () => {
    return <>
        <Header/>
        <Body>
            <BoardForm></BoardForm>
        </Body>
    </>
};

export default BoardFormPage;