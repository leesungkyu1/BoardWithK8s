import React from "react";
import Body from "../components/common/Body";
import BoardDetailContainer from "../containers/board/BoardDetailContainer";
import HeaderContainer from "../containers/common/HeaderContainer";

const BoardDetailPage = () => {
    return <>
        <HeaderContainer/>
        <Body>
            <BoardDetailContainer></BoardDetailContainer>
        </Body>
    </>
};

export default BoardDetailPage;