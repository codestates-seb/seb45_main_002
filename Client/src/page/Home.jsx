import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Calendar from "../component/Calendar";
import { useState } from "react";
import Modal from "../atom/GlobalModal";
import HowThis from "../component/HowThis";

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
  const [modalContents, setModalContents] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const howThisOnClickHandler = () => {
    setIsModal(true);
    setModalContents(() => <HowThis setIsModal={setIsModal} />);
  };

  return (
    <>
      {isModal ? (
        <Modal
          style={{
            minWidth: "240px",
            maxWidth: "90vw",
            minHeight: "180px",
            maxHeight: "80vh",
          }}
          isOpen={isModal}
          content={modalContents}
          setIsOpen={setIsModal}
          setContent={setModalContents}
          setHeader={() => {}}
          setFooter={() => {}}
        />
      ) : null}
      <Calendar nowDate={nowDate} setNowDate={setNowDate} />
      <HomeMenuContainer>
        <Link
          to="/pageswitch"
          onClick={() => {
            setPage(nowDate ? `diet/${nowDate}` : "diet");
          }}
        >
          <button>식단 관리 {nowDate ? `: ${nowDate}` : null}</button>
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("community")}>
          <button>커뮤니티</button>
        </Link>
        <Link to="/pageswitch" onClick={() => setPage("mypage")}>
          <button>마이페이지</button>
        </Link>
        <Link onClick={howThisOnClickHandler}>
          <button>사용 설명서</button>
        </Link>
        <Link to="https://github.com/codestates-seb/seb45_main_002">
          <span>코더스 깃허브</span>
        </Link>
      </HomeMenuContainer>
    </>
  );
}
export default Home;
