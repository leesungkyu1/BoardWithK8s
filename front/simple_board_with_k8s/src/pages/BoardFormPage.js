import React from "react";
import Header from "../components/common/Header";
import Body from "../components/common/Body";
import BoardFormContainer from "../containers/board/BoardFormContainer";

const BoardFormPage = () => {
    return <>
        <Header/>
        <Body>
            <BoardFormContainer></BoardFormContainer>
        </Body>
    </>
};

export default BoardFormPage;