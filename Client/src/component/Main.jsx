import Home from "../page/Home";
import MyPage from "../page/MyPage";
import Diet from "../page/Diet";
import CommunityPage from "../page/Community";

import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import style from "../style/style";

const MainContainer = styled.main`
  width: 100%;
  max-width: 600px;
  height: max-content;
  min-height: 100vh;
  padding-top: ${style.layout.header.height};
  margin-left: auto;
  margin-right: auto;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);
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
