
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style"

const PageSwitchContainer = styled.article`
  &>:first-child{
    height: ${style.layout.main.height/2};
  }
  &>:last-child{
    height: ${style.layout.main.height/2};
  }
  &>:last-child>*{
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${style.layout.main.width*4/5}; height: ${style.layout.header.height*2/3};
    margin-bottom: ${style.layout.wideMargin.height};
    background-color: #ffc123;
    font-size: ${style.layout.header.height*1/3};
    font-weight: 800;
    border-radius: 8px;
  }
  &:hover>:last-child>:nth-child(1){
    background-color: red;
  }
  &:hover>:last-child>:nth-child(2){
    background-color: yellow;
  }
  &:hover>:last-child>:nth-child(3){
    background-color: green;
  }
  &:hover>:last-child>:nth-child(4){
    background-color: blue;
  }
  &:hover>:last-child>:nth-child(5){
    background-color: violet;
  }
  &:hover>:last-child>:nth-child(odd){
    transform: translateX(120%);
    transition: .9s;
  }
  &>:last-child>:nth-child(even){
    margin-left: auto; margin-right: 0;
  }
  &:hover>:last-child>:nth-child(even){
    transform: translateX(-120%);
    transition: .9s;
  }
`

function PageSwitch({page}){

  const navigate = useNavigate()

  function isLogin(){
    if(localStorage.getItem("Authorization")===null && page==="/mypage"){
      navigate("*",{replace: true})
    }
    else{
      navigate(page,{replace: true})
    }
  }

  setTimeout(()=>isLogin(),1000)

  return(
    <PageSwitchContainer>
      <div>

      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </PageSwitchContainer>
  )
}
export default PageSwitch;
