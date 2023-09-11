import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Calendar from "../component/Calendar";
import { useState } from "react";

const HomeMenuContainer = styled.article`
  section {
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
  section:last-child {
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
        <section>식단 관리</section>
        <Link to="/pageswitch" onClick={() => setPage("community")}>
          커뮤니티
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("mypage")}>
          마이페이지
        </Link>
      </HomeMenuContainer>
    </>
  );
}
export default Home;
