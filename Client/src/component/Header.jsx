import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import useModalStore from "../store/modalStore";
import style from "../style/style";
import ModalComponent from "../atom/GlobalModal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const HeaderContainer = styled.header`
  display: flex;
  height: ${style.layout.header.height};
  justify-content: space-between;
  border: solid 1px orange;
  font-size: 200%;
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
  const openModal = useModalStore((state) => state.openModal);
  const handleOpenSignUpModal = () => {
    openModal(SignUpForm());
  };
  const handleOpenLoginModal = () => {
    openModal(LoginForm());
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
        <ModalComponent />{" "}
        <LoginButton onClick={handleOpenLoginModal}>로그인</LoginButton>
        <SignUpButton onClick={handleOpenSignUpModal}>회원가입</SignUpButton>
      </span>
    </HeaderContainer>
  );
}
export default Header;
