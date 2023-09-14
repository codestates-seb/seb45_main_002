import Home from "../page/Home";
import MyPage from "../page/MyPage";
import Diet from "../page/Diet";
<<<<<<< HEAD
import CommunityPage from "../page/Community";
import CommunityWrite from "../page/CommunityWrite"
import CommunityDetail from "../page/CommunityDetail";

=======
import CommunityList from "../page/Community";
import CommunityWrite from "../page/CommunityWrite";
import CommunityDetail from "../page/CommunityDetail";

import PageSwitch from "./PageSwitch";

>>>>>>> devFE
import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style";

const MainContainer = styled.main`
  position: absolute;
  top: ${style.layout.header.height};
<<<<<<< HEAD
  bottom: ${style.layout.wideMargin.height};
=======
  bottom: 0;
  /* bottom: ${style.layout.wideMargin.height}; */
>>>>>>> devFE
  left: ${style.layout.sideMargin};
  right: ${style.layout.sideMargin};
  border: solid 1px orange;
`;

<<<<<<< HEAD
function Main() {
  return (
    <MainContainer>
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/community" element={<CommunityPage />}></Route>
        <Route path="/community/write" element={<CommunityWrite />}></Route>
        <Route path="/community/detail/*" element={<CommunityDetail />}></Route>
        <Route path="/diet" element={<Diet />}></Route>
=======
function Main({ page, setPage }) {
  return (
    <MainContainer>
      <Routes>
        <Route path="*" element={<Home setPage={setPage} />}></Route>
        <Route path="/pageswitch/mypage" element={<MyPage />}></Route>
        <Route path="/pageswitch/community" element={<CommunityList />}></Route>
        <Route
          path="/pageswitch/community/write"
          element={<CommunityWrite />}
        ></Route>
        <Route
          path="/pageswitch/community/detail/*"
          element={<CommunityDetail />}
        ></Route>
        <Route path="/pageswitch/diet" element={<Diet />}></Route>
        <Route path="/pageswitch/diet/:date" element={<Diet />}></Route>
        <Route path="/pageswitch" element={<PageSwitch page={page} />}></Route>
>>>>>>> devFE
      </Routes>
    </MainContainer>
  );
}
<<<<<<< HEAD
export default Main;
=======
export default Main;
>>>>>>> devFE
