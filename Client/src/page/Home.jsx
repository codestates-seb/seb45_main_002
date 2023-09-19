import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Calendar from "../component/Calendar";
import { useState } from "react";
import Button from "../atom/button";

const HomeMenuContainer = styled.article`
  width: 100%;
  height: max-content;
  min-height: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;

  & > a {
    width: 100%;
    max-width: 340px;

    button {
      border: 2px solid #ffc123;
      background-color: white;
      border-radius: 0;
      border-left: 0;
      border-right: 0;
      width: 100%;
      height: 48px;
      font-weight: 600;

      &:hover {
        background-color: #ffc123;
        color: white;
      }
    }
  }

  & > a > span {
    font-size: 12px;
    font-weight: 400;

    &:hover {
      color: #898989;
    }
  }
`;

function Home({ setPage }) {
  const [nowDate, setNowDate] = useState("");

  return (
    <>
      <Calendar nowDate={nowDate} setNowDate={setNowDate} />
      <HomeMenuContainer>
        <Link
          to="/pageswitch"
          onClick={() => {
            setPage(nowDate ? `diet/${nowDate}` : "diet");
          }}
        >
          <button className="buttonStyle">
            식단 관리 {nowDate ? `: ${nowDate}` : null}
          </button>
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("community")}>
          <button className="buttonStyle">커뮤니티</button>
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("mypage")}>
          <button className="buttonStyle">마이페이지</button>
        </Link>
        <Link to="https://github.com/codestates-seb/seb45_main_002">
          <span>코더스 깃허브</span>
        </Link>
      </HomeMenuContainer>
    </>
  );
}
export default Home;
