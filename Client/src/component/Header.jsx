import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import style from "../style/style";
import Modal from "../atom/GlobalModal";
import ModalPortal from "../atom/ModalPortal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm"
import { useState } from "react";
import useZustand from "../zustand/Store";

const HeaderContainer = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${style.layout.header.height};
  justify-content: space-between;
  border: solid 1px orange;
  font-size: ${style.layout.header.height*7/8};
  &>*{
    display: flex;
  }
  &>:first-child>*{
    margin-left: ${style.layout.maxWidth/20/3}px;
  }
  &>:last-child{
    align-items: center;
    margin-right: ${style.layout.maxWidth/20/3}px;
    padding: 1% 0;
  }
`

const HambergerI = styled.i`
  cursor: pointer;
`

const LoginButton = styled.button`
  height: ${style.layout.header.height/2};
  border: none;
  background-color: orange;
  margin-right: ${style.layout.maxWidth/20/3}px;
  padding: 0 3%;
  color: white;
  font-size: ${style.layout.header.height/3};
  font-weight: bolder;
  white-space: nowrap;
  cursor: pointer;
`
const SignUpButton = styled(LoginButton)`
  background-color: green;
`

function Header({menu,setMenu}) {

  const accessToken = useZustand(state=>state.accessToken)
  
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [footer, setFooter] = useState(null);
  const [header, setHeader] = useState(null);

  function logoutButton(){
    localStorage.removeItem("access_token")
    window.location.reload()
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
        {style.layout.maxWidth < 769 ? (
          <HambergerI className="fa-solid fa-bars" onClick={()=>setMenu(!menu)} />
        ) : null}
        <Link to="/">
          <img
            src="https://media.discordapp.net/attachments/483947972380327936/1144245243550638090/NutritionCoders-1.png?width=1498&height=1002"
            height={style.layout.header.height*7/8}
            alt="logo"
          />
        </Link>
      </span>
      {accessToken?
        <span>
          <img alt="My Page" src="image/profileimage.svg" height={style.layout.header.height-style.layout.narrowMargin.height}></img>
          <SignUpButton onClick={logoutButton}>로그아웃</SignUpButton>
        </span>
        :
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
      }
    </HeaderContainer>
  );
}

export default Header;