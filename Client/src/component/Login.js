

import { styled } from "styled-components";

const LoginContainer = styled.article`
  z-index: 999;
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  background-color: rgb(128, 128, 128, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  &>section{
    display: flex;
    width: 50%; height: 80%;
    background-color: white;
  }
`

function Login({loginModal, setLoginModal}){
  return(
    <LoginContainer onClick={()=>setLoginModal(!loginModal)}>
      <section onClick={(e)=>e.stopPropagation()}>
        
      </section>
    </LoginContainer>
  )
}
export default Login;