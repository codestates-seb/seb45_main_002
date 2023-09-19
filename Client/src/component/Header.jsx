import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import style from "../style/style";
import Modal from "../atom/GlobalModal";
import ModalPortal from "../atom/ModalPortal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import useZustand from "../zustand/Store";
import useWindowSize from "../hook/useWindowSize";
import hamburgerIcon from "../asset/hamburgerIcon.png";

const HeaderContainer = styled.header`
  background-color: var(--white);
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-shadow: 0 2px 4px 1px rgba(255, 255, 255, 0.2);

  & > * {
    display: flex;
    align-items: center;
  }

  img.hamburger,
  img.profileImage {
    height: 32px;
    margin-right: 10px;
  }

  img.logo {
    height: 40px;
  }
`;

const LoginButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: orange;
  padding: 5px;
  color: white;
  font-size: 18px;
  font-weight: bolder;
  white-space: nowrap;
  cursor: pointer;
`;
const SignUpButton = styled(LoginButton)`
  background-color: green;
`;

const Header = ({ setMenu }) => {
  const accessToken = useZustand.useToken((state) => state.accessToken);
  const setAccessToken = useZustand.useToken((state) => state.setAccessToken);
  const refreshToken = useZustand.useToken((state) => state.refreshToken);
  const setRefreshToken = useZustand.useToken((state) => state.setRefreshToken);
  const size = useWindowSize();

  const navigate = useNavigate();

  localStorage.getItem("Authorization")
    ? setAccessToken(localStorage.getItem("Authorization"))
    : setAccessToken("");
  localStorage.getItem("Refresh")
    ? setRefreshToken(localStorage.getItem("Refresh"))
    : setRefreshToken("");

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [footer, setFooter] = useState(null);
  const [header, setHeader] = useState(null);

  function logoutButton() {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("Refresh");
    navigate("/");
  }

  const handleOpenLoginModal = () => {
    setIsOpen(true);
    setHeader("login header입니다");
    setFooter("login footer입니다");
    setContent(<LoginForm />);
  };
  const handleOpenSignUpModal = () => {
    setIsOpen(true);
    setHeader("signup header입니다");
    setFooter("sigunup footer입니다");
    setContent(<SignUpForm />);
  };

  return (
    <HeaderContainer>
      <span>
        {size.width < 1040 ? (
          <img
            className="hamburger"
            src={hamburgerIcon}
            alt="menu button"
            onClick={() => {
              setMenu(true);
            }}
          />
        ) : null}
        <Link to="/">
          <img
            className="logo"
            src="https://media.discordapp.net/attachments/483947972380327936/1144245243550638090/NutritionCoders-1.png?width=1498&height=1002"
            alt="logo"
          />
        </Link>
      </span>
      {accessToken ? (
        <span>
          <Link to="/pageswitch/mypage">
            <img
              className="profileImage"
              alt="My Page"
              src="https://media.discordapp.net/attachments/1144143589740400680/1151117333704749116/myPage_1.png?width=100&height=100"
            />
          </Link>
          <LoginButton onClick={logoutButton}>로그아웃</LoginButton>
        </span>
      ) : (
        <span>
          <LoginButton onClick={handleOpenLoginModal}>로그인</LoginButton>
          <SignUpButton onClick={handleOpenSignUpModal}>회원가입</SignUpButton>
          <ModalPortal>
            <Modal
              isOpen={isOpen}
              content={content}
              header={header}
              footer={footer}
              setContent={setContent}
              setHeader={setHeader}
              setFooter={setFooter}
              setIsOpen={setIsOpen}
            />
          </ModalPortal>
        </span>
      )}
    </HeaderContainer>
  );
};

export default Header;
