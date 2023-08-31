import { Link } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style";

const HomeContainer = styled.article`
  display: flex;
  flex-direction: column;

  padding-top: ${style.layout.wideMargin.height};
  text-align: center;
`;
const HomeMenu1 = styled.section`
  width: ${(style.layout.main.width / 3) * 2};
  border: solid 1px orange;
  margin-right: ${style.layout.main.width / 3};
  margin-bottom: ${style.layout.wideMargin.height};
  font-size: xx-large;
`;
const HomeMenu2 = styled(HomeMenu1)`
  margin-left: ${style.layout.main.width / 3};
`;

function Home() {
  return (
    <HomeContainer>
      <HomeMenu1>
        <Link>
          <div>1</div>
        </Link>
      </HomeMenu1>
      <HomeMenu2>
        <Link>
          <div>2</div>
        </Link>
      </HomeMenu2>
      <HomeMenu1>
        <Link>
          <div>3</div>
        </Link>
      </HomeMenu1>
      <HomeMenu2>
        <Link>
          <div>4</div>
        </Link>
      </HomeMenu2>
      <HomeMenu1>
        <Link to="/mypage">
          <div>마이페이지</div>
        </Link>
      </HomeMenu1>
    </HomeContainer>
  );
}
export default Home;
