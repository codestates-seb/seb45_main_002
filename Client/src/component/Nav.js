

import { styled } from "styled-components";

import style from "../style/style"

const NavContainer = styled.nav`
  position: absolute;
  top: ${style.layout.header.height+style.layout.wideMargin.height};
  left: ${style.layout.sideMargin/3};
  width: ${style.layout.sideMargin/3};;
`
const UlBox = styled.ul`
  list-style: none;
  &>li{
    border: solid orange 1px;
  }
`


function Nav(){
  return(
    <NavContainer>
      <UlBox>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </UlBox>
    </NavContainer>
  )
}
export default Nav;