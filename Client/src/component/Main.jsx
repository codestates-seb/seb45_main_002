import Home from "../page/Home";
import MyPage from "../page/MyPage";
import Diet from "../page/Diet";
import CommunityList from "../page/Community";
import CommunityWrite from "../page/CommunityWrite"
import CommunityDetail from "../page/CommunityDetail";

import PageSwitch from "./PageSwitch"

import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style";

const MainContainer = styled.main`
  position: absolute;
  top: ${style.layout.header.height};
  bottom: 0;
  /* bottom: ${style.layout.wideMargin.height}; */
  left: ${style.layout.sideMargin};
  right: ${style.layout.sideMargin};
  border: solid 1px orange;
`;

function Main({page,setPage}) {
  return (
    <MainContainer>
      <Routes>
        <Route path="*" element={<Home setPage={setPage} />}></Route>
        <Route path="/pageswitch/mypage" element={<MyPage />}></Route>
        <Route path="/pageswitch/community" element={<CommunityList />}></Route>
        <Route path="/pageswitch/community/write" element={<CommunityWrite />}></Route>
        <Route path="/pageswitch/community/detail/*" element={<CommunityDetail />}></Route>
        <Route path="/pageswitch/diet" element={<Diet />}></Route>
        <Route path="/pageswitch" element={<PageSwitch page={page} />}></Route>
      </Routes>
    </MainContainer>
  );
}
export default Main;