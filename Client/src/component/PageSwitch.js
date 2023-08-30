
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style"

const PageSwitchContainer = styled.article`
  position: absolute;
  top: 0; bottom: ${style.layout.wideMargin.height};
  left: 0; right: ${style.layout.sideMargin};
  display: flex;
  flex-direction: column;
  padding-top: ${style.layout.wideMargin.height};
  text-align: center;
  color: transparent;
  font-size: xx-large;
  &>:nth-child(1){
    background-color: red;
  }
  &>:nth-child(2){
    background-color: orange;
  }
  &>:nth-child(3){
    background-color: yellow;
  }
  &>:nth-child(4){
    background-color: green;
  }
  &>:nth-child(5){
    background-color: blue;
  }
  &>:nth-child(odd){
    border: solid 1px orange;
    width: ${style.layout.main.width/3*2};
    margin-right: ${style.layout.main.width/3};
    margin-bottom: ${style.layout.wideMargin.height};
  }
  &:hover>:nth-child(odd){
    transform: translateX(200%);
    background-color: transparent;
    transition: 2s;
  }
  &>:nth-child(even){
    border: solid 1px orange;
    width: ${style.layout.main.width/3*2};
    margin-left: ${style.layout.main.width/3};
    margin-bottom: ${style.layout.wideMargin.height};
  }
  &:hover>:nth-child(even){
    transform: translateX(-200%);
    background-color: transparent;
    transition: 2s;
  }
`

function PageSwitch({page}){

  const navigate = useNavigate()

  setTimeout(()=>navigate(page,{replace: true}),1000)

  return(
    <PageSwitchContainer>
      <section>1</section>
      <section>2</section>
      <section>3</section>
      <section>4</section>
      <section>마이페이지</section>
    </PageSwitchContainer>
  )
}
export default PageSwitch;