import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import style from "../style/style";
import Modal from "../atom/GlobalModal";
import ModalPortal from "../atom/ModalPortal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";

const HeaderContainer = styled.header`
  display: flex;
  max-width: 768px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  width: 100%;
  padding: 10px;
  text-align: center;
  height: ${style.layout.header.height};
  justify-content: space-between;
  border: solid 1px orange;
  font-size: 26px;
  & > * {
    display: flex;
    padding: 0.5% 0;
  }
  & > :first-child > * {
    margin-left: calc(${style.layout.maxWidth}px / 20 / 2);
  }
  & > :last-child > * {
    margin-right: calc(${style.layout.maxWidth}px / 20 / 2);
  }
`;

const LoginButton = styled.button`
  border: none;
  background-color: orange;
  padding: 0 1%;
  color: white;
  font-size: 50%;
  font-weight: bolder;
  white-space: nowrap;
  width: ${style.layout.sideMargin / 3};
  cursor: pointer;
`;
const SignUpButton = styled(LoginButton)`
  background-color: green;
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [footer, setFooter] = useState(null);
  const [header, setHeader] = useState(null);

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
        {style.layout.maxWidth < 980 ? (
          <i className="fa-solid fa-bars"></i>
        ) : null}
        <Link to="/">
          <img
            width={style.layout.maxWidth < 980 ? "100%" : "200%"}
            alt="logo"
          />
        </Link>
      </span>
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
    </HeaderContainer>
  );
}

export default Header;
