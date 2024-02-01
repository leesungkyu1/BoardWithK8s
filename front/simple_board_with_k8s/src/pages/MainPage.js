import React from "react";
import Header from "../components/common/Header"
import Body from "../components/common/Body";
import BoardListContainer from "../containers/board/BoardListContainer";
import Pagenation from "../components/common/Pagination";


const MainPage = () => {
    return <>
      <Header/>
      <Body>
        <BoardListContainer>
        </BoardListContainer>
      </Body>
      <Pagenation/>
    </>
};

export default MainPage;