import { styled } from "styled-components";
import style from "../style/style";

const NavContainer = styled.nav`
  position: absolute;
  top: ${style.layout.header.height + style.layout.wideMargin.height};
  left: ${style.layout.sideMargin / 3};
`;
const UlBox = styled.ul`
  list-style: none;
  & > li {
    border: solid orange 1px;
    width: 25%; //아이콘 크기에 맞게 변경 필요
    overflow: hidden;
    white-space: nowrap;
    transition: 1s;
    &:hover {
      width: ${style.layout.sideMargin / 3};
      transition: 1s;
    }
  }
`;

function Nav() {
  return (
    <NavContainer>
      <UlBox>
        <li>1 2345</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </UlBox>
    </NavContainer>
  );
}
export default Nav;
