import { useState,useEffect } from "react";

import axios from "axios";
import {styled} from "styled-components";

import style from "../style/style";

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


const TabTest = styled.div`
  & input{
    display:none;
  }
  & input:checked ~ label{
    background: #ccc;
  }
  &>div{
    display:none; 
    width: 100%;
    text-align:left; 
    padding: 20px;
    position:absolute; 
    left:0; top:40px; 
    box-sizing: border-box; 
    border : 5px solid #f9f9f9;
  }
  & input:checked ~ div{
    display: block;
  }
`

function loadProfile(){
  axios.get("http://43.201.194.176:8080/mypage/",{
    headers: {
      Authorization: localStorage.getItem("Authorization").substring(15)
    }
  })
  .then(res=>console.log(res+"서버접속 성공"))
  .catch(err=>console.log(err+"서버접속 실패"))
}

const Consolebtn = styled.button`
  width: 500px;
  height: 500px;
`

function MyPage() {

  useEffect(()=>loadProfile(),[])

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
        <TabTest>
          <input type="radio" checked name="tabmenu" id="tab1"></input>
          <label for="tab1">tab1</label>
          <div className="tabCon">
            tabCon1<br />tabCon1<br />tabCon1<br />tabCon1<br />tabCon1<br />tabCon1<br />tabCon1<br />tabCon1<br />tabCon1<br />tabCon1<br />
          </div>
          <input type="radio" name="tabmenu" id="tab2"></input>
          <label for="tab2">tab2</label>
          <div className="tabCon">
            tabCon2<br />tabCon2<br />tabCon2<br />tabCon2<br />tabCon2<br />tabCon2<br />tabCon2<br />tabCon2<br />tabCon2<br />tabCon2<br />
          </div>
          <input type="radio" name="tabmenu" id="tab3"></input>
          <label for="tab3">tab3</label>
          <div className="tabCon">
            tabCon3<br />tabCon3<br />tabCon3<br />tabCon3<br />tabCon3<br />tabCon3<br />tabCon3<br />tabCon3<br />tabCon3<br />tabCon3<br />
          </div>
        </TabTest>
        <div>
        <Consolebtn onClick={()=>{
          console.log("http://43.201.194.176:8080/mypage/"+localStorage.getItem("Authorization").substring(15))
        }}>콘솔로그 찍는 버튼</Consolebtn>
        </div>
      </MypageBox>
    </MypageContainer>
  );
}
export default MyPage;
