
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
  &>:last-child>:nth-child(1){
    background-color: red;
  }
  &>:last-child>:nth-child(2){
    background-color: orange;
  }
  &>:last-child>:nth-child(3){
    background-color: yellow;
  }
  &>:last-child>:nth-child(4){
    background-color: green;
  }
  &>:last-child>:nth-child(5){
    background-color: blue;
  }
  &>:last-child>:nth-child(odd){
    border: solid 1px orange;
    width: ${style.layout.main.width/3*2};
    height: ${style.layout.main.height/2/5};
    margin-right: ${style.layout.main.width/3};
  }
  &:hover>:last-child>:nth-child(odd){
    transform: translateX(200%);
    background-color: transparent;
    transition: 2s;
  }
  &>:last-child>:nth-child(even){
    border: solid 1px orange;
    width: ${style.layout.main.width/3*2};
    height: ${style.layout.main.height/2/5};
    margin-left: ${style.layout.main.width/3};
  }
  &:hover>:last-child>:nth-child(even){
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