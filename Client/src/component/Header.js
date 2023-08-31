import Login from "./Login";
import SignUp from "./SignUp";

import { Link } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";

import style from "../style/style";

const HeaderContainer = styled.header`
  display: flex;
  height: ${style.layout.header.height};
  justify-content: space-between;
  border: solid 1px orange;
  font-size: 2.5rem;
  &>:nth-last-child(3){
    margin: ${style.layout.narrowMargin.width}px;
    margin-right: ${style.layout.sideMargin+style.layout.wideMargin.width+style.layout.narrowMargin.width}px;
  }
  &>a{
    padding: 3px;
  }
  &>:last-child{
    display: flex;
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    padding-left: 0 !important;
  }
`
const LoginButton = styled.button`
  border: none;
  background-color: orange;
  padding: 0 3%;
  color: white;
  font-size: 1rem;
  font-weight: bolder;
  white-space: nowrap;
  margin-right: ${style.layout.narrowMargin.width};
`
const SignUpButton = styled(LoginButton)`
  background-color: green;
`

function Header(){
  const [loginModal, setLoginModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)
  return(
    <HeaderContainer>
      {style.layout.maxWidth<768?  
        <i className="fa-solid fa-bars"></i>
        :
        null }
      <Link to="/">
        <img
         src="./textLogo.png"
         width={style.layout.maxWidth<768? "100%" : "200%"}
         height="100%"
        />
      </Link>
      <span>
        <LoginButton onClick={()=>setLoginModal(!loginModal)}>로그인</LoginButton>
        <SignUpButton onClick={()=>setSignUpModal(!signUpModal)}>회원가입</SignUpButton>
      </span>
      {loginModal? <Login loginModal={loginModal} setLoginModal={setLoginModal} /> : null}
      {signUpModal? <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} /> : null}
    </HeaderContainer>
  )
}
export default Header;