

import {styled} from "styled-components"

import style from "../style/style"
import { useState } from "react"

const MypageContainer = styled.article`
  height: ${style.layout.main.height+style.layout.wideMargin.height}; width: ${style.layout.main.width};
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
  background-color: rgb(242, 242, 242);
  &>ul{
    height: ${style.layout.header.height};
    list-style: none;
    align-content: end;
    >li{
      height: ${style.layout.header.height};
      width: ${style.layout.main.width/4-8};
      ${console.log(style.layout.main.width)}
      float: left;
      background-color: white; border: solid 1px orange;
      padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
      border-radius: 25px 25px 0 0;
      cursor: pointer;
    }
    >:nth-child(1){
      ${props=>props.children[0].props.children[0].props["profile"]===1? "border-bottom: none;" : null}
    }
    >:nth-child(2){
      ${props=>props.children[0].props.children[0].props["profile"]===2? "border-bottom: none;" : null}
    }
    >:nth-child(3){
      ${props=>props.children[0].props.children[0].props["profile"]===3? "border-bottom: none;" : null}
    }
    >:last-child{
      background-color: rgb(242, 242, 242);
      border: none; border-bottom: solid 1px orange;
      border-radius: 0;
    }
  }
`
const MypageBox = styled.section`
  height: ${style.layout.main.height-style.layout.wideMargin.height};
  width: ${style.layout.main.width-style.layout.wideMargin.width*2};
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  border: solid 1px orange;
  border-top: none;
  background-color: white;
`

function MyPage() {

  const [profile, setProfile] = useState(1);

  return (
    <MypageContainer>
      <ul>
        <li onClick={()=>setProfile(1)} profile={profile}>프로필</li>
        <li onClick={()=>setProfile(2)} profile={profile}>개인정보</li>
        <li onClick={()=>setProfile(3)} profile={profile}>끼니 확인</li>
        <li></li>
      </ul>
      <MypageBox>
        <div></div>
        <div>

        </div>
      </MypageBox>
    </MypageContainer>
  );
}
export default MyPage;
