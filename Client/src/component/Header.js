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
  &>*{
    display: flex;
    padding: .5% 0;
  }
  &>:first-child>*{
    margin-left: calc(${style.layout.maxWidth}px/20/2);
  }
  &>:last-child>*{
    margin-right: calc(${style.layout.maxWidth}px/20/2);
  }
`
const LoginButton = styled.button`
  border: none;
  background-color: orange;
  padding: 0 3%;
  color: white;
  font-size: 50%;
  font-weight: bolder;
  white-space: nowrap;
`
const SignUpButton = styled(LoginButton)`
  background-color: green;
`

function Header(){
  const [loginModal, setLoginModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)
  return(
    <HeaderContainer>
      <span>
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
      </span>
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