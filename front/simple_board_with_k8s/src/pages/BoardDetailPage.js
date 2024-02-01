import React from "react";
import Header from "../components/common/Header";
import Body from "../components/common/Body";
import BoardDetailContainer from "../containers/board/BoardDetailContainer";

const BoardDetailPage = () => {
    return <>
        <Header/>
        <Body>
            <BoardDetailContainer></BoardDetailContainer>
        </Body>
    </>
};

export default BoardDetailPage;