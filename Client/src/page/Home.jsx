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

  & > a {
    button {
      border-radius: 0;
      border-left: 0;
      border-right: 0;
      width: 340px;
      height: 48px;
      font-weight: 600;

      &:hover {
        background-color: #ffc123;
        color: white;
      }
    }
  }

  a:nth-child(1) > button:hover {
    background-image: url("/image/orangeButton1.png");
  }
  a:nth-child(2) > button:hover {
    background-image: url("/image/orangeButton2.png");
  }
  a:nth-child(3) > button:hover {
    background-image: url("/image/orangeButton3.png");
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
          <Button>식단 관리 {nowDate ? `: ${nowDate}` : null}</Button>
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("community")}>
          <Button>커뮤니티</Button>
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("mypage")}>
          <Button>마이페이지</Button>
        </Link>
        <Link to="https://github.com/codestates-seb/seb45_main_002">
          <span>코더스 깃허브</span>
        </Link>
      </HomeMenuContainer>
    </>
  );
}
export default Home;
