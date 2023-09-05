import Home from "../page/Home";
import MyPage from "../page/MyPage";
import Diet from "../page/Diet";
import CommunityPage from "../page/Community";

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
        <Route path="*" element={<Home />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/community" element={<CommunityPage />}></Route>
        <Route path="/diet" element={<Diet />}></Route>
      </Routes>
    </MainContainer>
  );
}
export default Main;
