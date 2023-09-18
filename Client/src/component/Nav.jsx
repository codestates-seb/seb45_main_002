import { styled } from "styled-components";
import style from "../style/style";
import { Link } from "react-router-dom";

const NavContainer = styled.nav`
  position: absolute;
  top: ${style.layout.header.height + style.layout.wideMargin.height};
  left: ${style.layout.sideMargin/6};
`;
const UlBox = styled.ul`
  list-style: none;
  &>li{
    width: ${style.layout.sideMargin/3};
    margin-bottom: ${style.layout.wideMargin.height};
    overflow: hidden;
    white-space: nowrap;
    transition: 1s;
    background-color: orange;
    border-radius: 10px;
    &>a{
      display: flex;
      align-items: center;
    }
    &>a>:first-child{
      margin: 0; padding: 0;
      background-color: white;
      width: ${style.layout.sideMargin/3};
      height: ${style.layout.sideMargin/3};
      border-radius: 10px;
    }
    &>a>:last-child{
      padding-left: ${style.layout.narrowMargin.width/3};
    }
    &:hover {
      width: ${style.layout.sideMargin*4/5};
      transition: 1s;
    }
  }
`;

function Nav({setPage}) {
  return (
    <NavContainer>
      <UlBox>
        <li>
          <Link to="/pageswitch/community">
            <img src="https://media.discordapp.net/attachments/1144143589740400680/1146772585284116530/Frame_1.png?width=116&height=116"></img>
            <div>검색페이지</div>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src="https://media.discordapp.net/attachments/1144143589740400680/1146772585548349542/Frame_2.png?width=116&height=116"></img>
            <div>홈 화면</div>
          </Link>
        </li>
        <li>
          <Link to="/pageswitch/mypage">
            <img src="https://media.discordapp.net/attachments/1144143589740400680/1146772585787445348/Frame_3.png?width=116&height=116"></img>
            <div>마이페이지</div>
          </Link>
        </li>
        <li>
          <Link to="/pageswitch/community">
            <img src="https://media.discordapp.net/attachments/1144143589740400680/1146772586051674152/Frame_4.png?width=116&height=116"></img>
            <div>커뮤니티</div>
          </Link>
        </li>
        <li>
          <Link to="/pageswitch/chat">
            <img src="https://media.discordapp.net/attachments/1144143589740400680/1146772586496262275/Frame_5.png?width=116&height=116"></img>
            <div>뉴코채팅</div>
          </Link>
        </li>
      </UlBox>
    </NavContainer>
  );
}
export default Nav;
