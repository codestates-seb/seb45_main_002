import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import style from "../style/style";
import Modal from "../atom/GlobalModal";
import ModalPortal from "../atom/ModalPortal";
import LoginForm from "./LoginForm";
import { useState } from "react";

const HeaderContainer = styled.header`
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  height: ${style.layout.header.height};
  justify-content: center;
  align-items: center;
  border-bottom: solid 2px #444444;
  font-size: 18px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

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
  max-width: 768px;
  width: 100%;
`;

const ProfileContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  color: black;
  white-space: nowrap;
  border: 1px solid #444444;
  border-radius: 50%;
  cursor: pointer;
  /* margin-right: calc(${style.layout.maxWidth}px / 20 / 4); */
`;

const NavContainer = styled.div`
  width: 40px;
  height: 40px;
  border: solid 1px red;
  /* margin-left: calc(${style.layout.maxWidth}px / 20 / 4); */
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

  return (
    <HeaderContainer>
      <HeaderIconContainer>
        <NavContainer>NAV</NavContainer>
        <Link to="/">
          <span>뉴트리션 코더스</span>{" "}
        </Link>
        <ProfileContainer
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
        </ProfileContainer>
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
