import { styled } from "styled-components";
import style from "../style/style";
import { Link } from "react-router-dom";
import navHomeIcon from "../asset/navHomeIcon.png";
import navCommunityIcon from "../asset/navCommunityIcon.png";
import navMyPageIcon from "../asset/navMyPageIcon.png";

const NavContainer = styled.nav`
  position: absolute;
  top: 80px;
  left: 56px;
`;
const UlBox = styled.ul`
  list-style: none;
  & > li {
    width: 48px;
    margin-bottom: 20px;
    overflow: hidden;
    white-space: nowrap;
    transition: 1s;
    background-color: orange;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.2);
    & > a {
      display: flex;
      align-items: center;
    }
    & > a > img {
      margin: 0;
      padding: 0;
      width: 48px;
      height: 48px;
      border-radius: 8px;
    }
    & > a > :last-child {
      padding-left: 10px;
    }
    &:hover {
      width: 160px;
      transition: 1s;
    }
  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <UlBox>
        <li>
          <Link to="/">
            <img src={navHomeIcon} alt="home icon" />
            <div>홈 화면</div>
          </Link>
        </li>
        <li>
          <Link to="/pageswitch/community">
            <img src={navCommunityIcon} alt="community icon" />
            <div>커뮤니티</div>
          </Link>
        </li>
        <li>
          <Link to="/pageswitch/mypage">
            <img src={navMyPageIcon} alt="community icon" />
            <div>마이페이지</div>
          </Link>
        </li>
      </UlBox>
    </NavContainer>
  );
};
export default Nav;
