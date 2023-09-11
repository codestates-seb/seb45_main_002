import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import style from "../style/style";
import Modal from "../atom/GlobalModal";
import ModalPortal from "../atom/ModalPortal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import useZustand from "../zustand/Store";

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  height: ${style.layout.header.height};
  justify-content: center;
  align-items: center;
  border-bottom: solid 2px #444444;
  font-size: 18px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  background-color: ${style.color.white};

  & > * {
    align-items: center;
    display: flex;
    /* padding: 0, auto; */
    font-family: "Gugi", "sans-serif";
  }

  /* & > :first-child > * {
    margin-left: calc(${style.layout.maxWidth}px / 20 / 2);
  }
  & > :last-child > * {
    margin-right: calc(${style.layout.maxWidth}px / 20 / 2);
  } */

  & > link {
    text-decoration: none;
    color: inherit;
  }
`;

const HeaderIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  max-width: 768px;
  width: 100%;
  padding: 5px;
`;

// const ProfileContainer = styled.div`
//   width: 40px;
//   height: 40px;
//   background-color: white;
//   color: black;
//   white-space: nowrap;
//   border: 1px solid #444444;
//   border-radius: 50%;
//   cursor: pointer;
//   margin-right: calc(${style.layout.maxWidth}px / 20 / 4);
// `;

const HambergerContainer = styled.div`
  width: 40px;
  height: 40px;
  /* border: solid 1px red; */
  justify-content: center;
  align-items: center;
  & > i {
    width: 90%;
    height: 00%;
  }
  /* margin-left: calc(${style.layout.maxWidth}px / 20 / 4); */
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30%;
  height: ${style.layout.header.height / 2};
`;

const LoginButton = styled.button`
  height: ${style.layout.header.height / 2};
  border: none;
  background-color: orange;
  color: white;
  font-size: ${style.layout.header.height / 5};
  font-weight: bolder;
  white-space: nowrap;
  cursor: pointer;
`;
const SignUpButton = styled(LoginButton)`
  background-color: green;
`;

function Header({ menu, setMenu }) {
  const accessToken = useZustand((state) => state.accessToken);

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
      <HeaderIconContainer>
        <HambergerContainer>
          {style.layout.maxWidth < 769 ? (
            <i
              className="fa-solid fa-bars fa-2x"
              onClick={() => setMenu(!menu)}
            />
          ) : null}
        </HambergerContainer>
        <Link to="/">
          <span>뉴트리션 코더스</span>{" "}
        </Link>

        <BtnContainer>
          {accessToken ? (
            <>
              <img
                alt="My Page"
                src="https://media.discordapp.net/attachments/1144143589740400680/1146772585787445348/Frame_3.png?width=116&height=116"
                height={
                  style.layout.header.height - style.layout.narrowMargin.height
                }
              ></img>
              <SignUpButton>로그아웃</SignUpButton>
            </>
          ) : (
            <>
              <LoginButton onClick={handleOpenLoginModal}>로그인</LoginButton>
              <SignUpButton onClick={handleOpenSignUpModal}>
                회원가입
              </SignUpButton>
              {/* 
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
              </ModalPortal> */}
            </>
          )}
        </BtnContainer>
        {/* <ProfileContainer
          onClick={
            // isLoggedIn ?
            handleOpenLoginModal
            // : undefined
          }
        >
          <img
            src={
              // user.imageUrl ||
              "image/profileimage.svg"
            }
            alt="profileimage"
          />
        </ProfileContainer> */}
      </HeaderIconContainer>
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
    </HeaderContainer>
  );
}

export default Header;
