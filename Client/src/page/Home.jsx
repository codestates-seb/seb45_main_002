import { Link } from "react-router-dom";
import { styled } from "styled-components";
<<<<<<< HEAD

import style from "../style/style";

const HomeContainer = styled.article`
  text-align: center;
  & > :first-child {
    height: ${style.layout.main.height / 2};
    padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
  }
  & > :last-child {
    height: ${style.layout.main.height / 2};
  }
`;
const HomeMenu1 = styled.section`
  width: ${(style.layout.main.width / 3) * 2};
  height: ${style.layout.main.height / 2 / 5};
  border: solid 1px orange;
  margin-right: ${style.layout.main.width / 3};
  font-size: xx-large;
`;
const HomeMenu2 = styled(HomeMenu1)`
  margin-left: ${style.layout.main.width / 3};
`;

function Home({ setPage }) {
  return (
    <HomeContainer>
      <div>캘린더 위치</div>
      <div>
        <HomeMenu1>
          <Link to="/diet">
            <div>diet</div>
          </Link>
        </HomeMenu1>
        <HomeMenu2>
          <Link>
            <div>2</div>
          </Link>
        </HomeMenu2>
        <HomeMenu1>
          <Link>
            <div>3</div>
          </Link>
        </HomeMenu1>
        <HomeMenu2>
        <Link to="/community" onClick={() => setPage("community")}>
            <div>커뮤니티</div>
          </Link>
        </HomeMenu2>
        <HomeMenu1>
          <Link to="/mypage">
            <div>마이페이지</div>
          </Link>
        </HomeMenu1>
      </div>
    </HomeContainer>
=======
import Calendar from "../component/Calendar";
import { useState } from "react";

const HomeMenuContainer = styled.article`
  > * {
    width: calc(600px - 130px);
    height: 48px;
    margin-bottom: 10px;
    background-color: #ffc123;
    padding-left: 130px;
    padding-right: 0;
    display: flex;
    align-items: center;
    border-radius: 0 8px 8px 0;
    font-size: 18px;
    font-weight: 800;

    @media (max-width: 600px) {
      width: calc(170px + 100% / 2);
    }

    @media (max-width: 360px) {
      width: calc(100vw - 10px);
    }
  }
  a:last-child {
    margin-left: auto;
    margin-right: 0;
    padding-left: 0;
    padding-right: 130px;
    justify-content: right;
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
      </HomeMenuContainer>
    </>
>>>>>>> devFE
  );
}
export default Home;
