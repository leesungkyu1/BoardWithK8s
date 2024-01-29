import React from "react";
import { Route, Navigate, Routes } from "../node_modules/react-router-dom/dist/index";
import MainPage from "./pages/MainPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import BoardFormPage from "./pages/BoardFormPage";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/boardDetail" element={<BoardDetailPage></BoardDetailPage>}></Route>
        <Route path="/boardForm" element={<BoardFormPage></BoardFormPage>}></Route>
      </Routes>
    </>
  )
}

export default App;
