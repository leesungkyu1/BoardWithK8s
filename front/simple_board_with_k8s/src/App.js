import React from "react";
import { Route, Navigate, Routes } from "../node_modules/react-router-dom/dist/index";
import MainPage from "./pages/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
      </Routes>
    </>
  )
}

export default App;
