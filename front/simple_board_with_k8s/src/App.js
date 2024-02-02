import React from "react";
import { Route, Navigate, Routes } from "../node_modules/react-router-dom/dist/index";
import MainPage from "./pages/MainPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import BoardFormPage from "./pages/BoardFormPage";
import MemberPage from "./pages/MemberPage";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/boardDetail/:id" element={<BoardDetailPage></BoardDetailPage>}></Route>
        <Route path="/boardForm" element={<BoardFormPage></BoardFormPage>}></Route>
        <Route path="/memberJoin" element={<MemberPage></MemberPage>}></Route>
        <Route path="/login" element={<MemberPage></MemberPage>}></Route>
      </Routes>
    </>
  )
}

export default App;
