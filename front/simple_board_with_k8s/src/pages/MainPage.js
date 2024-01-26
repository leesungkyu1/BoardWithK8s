import React from "react";
import Header from "../components/common/Header"
import Body from "../components/common/Body";
import BoardWrapper from "../components/board/BoardWrapper";
import BoardItem from "../components/board/BoardItem";
import Pagenation from "../components/common/Pagination";


const MainPage = () => {
    return <>
      <Header/>
      <Body>
        <BoardWrapper>
            <BoardItem></BoardItem>
            <BoardItem></BoardItem>
            <BoardItem></BoardItem>
        </BoardWrapper>
      </Body>
      <Pagenation/>
    </>
};

export default MainPage;