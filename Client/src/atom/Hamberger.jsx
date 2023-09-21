import { Link } from "react-router-dom";
import { styled } from "styled-components";
import navHomeIcon from "../asset/navHomeIcon.png";
import navCommunityIcon from "../asset/navCommunityIcon.png";
import navMyPageIcon from "../asset/navMyPageIcon.png";

const MenuContainer = styled.article`
  position: absolute;
  display: flex;
  gap: 20px;
  justify-content: center;
  top: 60px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: rgba(125, 125, 125, 0.5);
  padding-top: 20px;
  z-index: 999;
  & a{
    height: 48px;
  }
  img {
    height: 48px;
    border-radius: 8px;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.2);
  }
`;

function Hamberger({ setPage, menu, setMenu }) {
  return (
    <MenuContainer onClick={(e) => setMenu(!menu)}>
      <Link to="/">
        <img alt="home" src={navHomeIcon}></img>
      </Link>
      <Link to="/pageswitch" onClick={() => setPage("community")}>
        <img alt="comunity" src={navCommunityIcon}></img>
      </Link>
      <Link to="/pageswitch" onClick={() => setPage("mypage")}>
        <img alt="mypage" src={navMyPageIcon}></img>
      </Link>
    </MenuContainer>
  );
}
export default Hamberger;
