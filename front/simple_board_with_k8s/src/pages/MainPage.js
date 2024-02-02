import React from "react";
import Header from "../components/common/Header"
import Body from "../components/common/Body";
import BoardListContainer from "../containers/board/BoardListContainer";
import PagenationContainer from "../containers/common/PaginationContainer";



const MainPage = () => {
    return <>
      <Header/>
      <Body>
        <BoardListContainer>
        </BoardListContainer>
      </Body>
      <PagenationContainer/>
    </>
};

export default MainPage;