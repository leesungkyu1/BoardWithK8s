import React from "react";
import Header from "../components/common/Header";
import Body from "../components/common/Body";
import BoardDetail from "../components/board/BoardDetail";

const BoardDetailPage = () => {
    return <>
        <Header/>
        <Body>
            <BoardDetail/>
        </Body>
    </>
};

export default BoardDetailPage;