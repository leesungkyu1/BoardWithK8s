import React from "react";
import Body from "../components/common/Body";
import BoardListContainer from "../containers/board/BoardListContainer";
import PagenationContainer from "../containers/common/PaginationContainer";
import HeaderContainer from "../containers/common/HeaderContainer";



const MainPage = () => {
    return <>
      <HeaderContainer/>
      <Body>
        <BoardListContainer>
        </BoardListContainer>
      </Body>
      <PagenationContainer/>
    </>
};

export default MainPage;