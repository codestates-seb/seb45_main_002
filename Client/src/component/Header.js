import { styled } from "styled-components";


import style from "../style/style";

const HeaderContainer = styled.header`
  display: flex;
  height: ${style.layout.header.height};
  justify-content: space-between;
  border: solid 1px orange;
  font-size: 200%;
  &>span{
    display: flex;
    justify-content: flex-start;
    padding: .5% 0;
  }
  &>span>*{
    margin: 0 calc(${style.layout.maxWidth}px/20/2);
  }
`

function Header(){
  return(
    <HeaderContainer>
      <span>
        <i className="fa-solid fa-bars"></i>
        <img src="./textLogo.png" width="50%" height="100%" />
      </span>
      <span>
        <span>로그인</span>
        <span>회원가입</span>
      </span>
    </HeaderContainer>
  )
}
export default Header;