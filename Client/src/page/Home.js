import { Link } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style";

const HomeContainer = styled.article`
  text-align: center;
  &>:first-child{
    height: ${style.layout.main.height/2};
    padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
  }
  &>:last-child{
    height: ${style.layout.main.height/2};
  }
`
const HomeMenu1 = styled.section`
  width: ${style.layout.main.width/3*2};
  height: ${style.layout.main.height/2/5};
  border: solid 1px orange;
  margin-right: ${style.layout.main.width/3};
  font-size: xx-large;
`
const HomeMenu2 = styled(HomeMenu1)`
  margin-left: ${style.layout.main.width/3};
`

function Home({setPage}){
  return(
    <HomeContainer>
      <div>
        캘린더 위치
        <br />
        캘린더 위치
        <br />캘린더 위치
        <br />캘린더 위치
        <br />캘린더 위치
        <br />캘린더 위치
        <br />캘린더 위치
        <br />캘린더 위치
        <br />캘린더 위치
        <br />
      </div>
      <div>
        <HomeMenu1><Link><div>1</div></Link></HomeMenu1>
        <HomeMenu2><Link><div>2</div></Link></HomeMenu2>
        <HomeMenu1><Link><div>3</div></Link></HomeMenu1>
        <HomeMenu2><Link><div>4</div></Link></HomeMenu2>
        <HomeMenu1><Link to="/pageswitch" onClick={()=>setPage("mypage")}><div>마이페이지</div></Link></HomeMenu1>
      </div>
    </HomeContainer>
  )
}
export default Home;