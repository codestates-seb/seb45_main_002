import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Calendar from "../component/Calendar";
import { useState } from "react";
import style from "../style/style";

const HomeMenuContainer = styled.article`
  &>*{
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${style.layout.main.width*4/5}; height: ${style.layout.header.height*2/3};
    margin-bottom: ${style.layout.wideMargin.height};
    background-color: #ffc123;
    font-size: ${style.layout.header.height*1/3};
    font-weight: 800;
  }
  &>:nth-child(odd){
    border-radius: 0 8px 8px 0;
  }
  &>:nth-child(even){
    margin-left: auto; margin-right: 0;
    border-radius: 8px 0 0 8px;
  }
`;

function Home({ setPage }) {
  const [nowDate, setNowDate] = useState("날짜");

  return (
    <>
      <Calendar />
      <HomeMenuContainer>
        <Link to="/pageswitch" onClick={() => setPage("diet")}>
          식단 관리
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("community")}>
          커뮤니티
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("mypage")}>
          마이페이지
        </Link>
        <Link to="https://www.notion.so/codestates/316e22f2ce454966879a980eca003515">
          코더스 노션
        </Link>
        <Link to="https://github.com/codestates-seb/seb45_main_002">
          코더스 깃허브
        </Link>
      </HomeMenuContainer>
    </>
  );
}
export default Home;
