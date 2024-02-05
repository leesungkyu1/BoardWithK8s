import React from "react";
import Body from "../components/common/Body";
import BoardFormContainer from "../containers/board/BoardFormContainer";
import HeaderContainer from "../containers/common/HeaderContainer";

const BoardFormPage = () => {
    return <>
        <HeaderContainer/>
        <Body>
            <BoardFormContainer></BoardFormContainer>
        </Body>
    </>
};

export default BoardFormPage;