import Home from "../page/Home";
import MyPage from "../page/MyPage";
import TableAdd from "../page/TableAdd";
import PageSwitch from "./PageSwitch"

import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style";
import { useState } from "react";

const MainContainer = styled.main`
  position: absolute;
  top: ${style.layout.header.height};
  bottom: ${style.layout.wideMargin.height};
  left: ${style.layout.sideMargin};
  right: ${style.layout.sideMargin};
  border: solid 1px orange;
`;

function Main() {
  const [page, setPage] = useState("/")
  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Home setPage={setPage} />}></Route>
        <Route path="/mypage" element={<MyPage setPage={setPage} />}></Route>
        <Route path="/tableadd" element={<TableAdd setPage={setPage} />}></Route>
        <Route path="/pageswitch" element={<PageSwitch page={page} />}></Route>
      </Routes>
    </MainContainer>
  );
}
export default Main;
