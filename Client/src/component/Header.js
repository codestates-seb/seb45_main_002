import Login from "./Login"
import SignUp from "./SignUp"

import { styled } from "styled-components";


import style from "../style/style";
import { useState } from "react";

const HeaderContainer = styled.header`
  display: flex;
  height: ${style.layout.header.height};
  justify-content: space-between;
  border: solid 1px orange;
  font-size: 200%;
  &>:first-child{
    display: flex;
    justify-content: flex-start;
    padding: .5% 0;
  }
  &>:first-child>*{
    margin-left: calc(${style.layout.maxWidth}px/20/2);
  }
  &>:last-child{
    display: flex;
    padding: .5% 0;
  }
  &>:last-child>*{
    margin-right: calc(${style.layout.maxWidth}px/20/2);
  }
`
const LoginButton = styled.button`
  border: none;
  background-color: orange;
  padding: 0 1%;
  color: white;
  font-size: 50%;
  font-weight: bolder;
  width: ${style.layout.sideMargin/3};
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
        <i className="fa-solid fa-bars"></i>
        <img src="./textLogo.png" width="50%" height="100%" />
      </span>
      <span>
        <LoginButton onClick={()=>setLoginModal(!loginModal)}>로그인</LoginButton>
        <SignUpButton onClick={()=>setSignUpModal(!signUpModal)}>회원가입</SignUpButton>
      </span>
      {loginModal? <Login /> : null}
      {signUpModal? <SignUp /> : null}
    </HeaderContainer>
  )
}
export default Header;