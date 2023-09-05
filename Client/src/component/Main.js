import Home from "../page/Home";
import MyPage from "../page/MyPage";
import TableAdd from "../page/TableAdd";
import { Community } from "../page/Community";

import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style";

const MainContainer = styled.main`
  position: absolute;
  top: ${style.layout.header.height};
  bottom: ${style.layout.wideMargin.height};
  left: ${style.layout.sideMargin};
  right: ${style.layout.sideMargin};
  border: solid 1px orange;
`;

function Main() {
  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/tableadd" element={<TableAdd />}></Route>
      </Routes>
    </MainContainer>
  );
}
export default Main;
