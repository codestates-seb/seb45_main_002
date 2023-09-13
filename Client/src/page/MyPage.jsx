import { useState,useEffect } from "react";

import axios from "axios";
import {styled} from "styled-components";

import style from "../style/style";

const Container = styled.article`
  height: ${style.layout.main.height+style.layout.wideMargin.height}; width: ${style.layout.main.width};
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
  background-color: rgb(242, 242, 242);
`

const BlockContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>h2{
    background-color: ${style.color.ivory4};
    border-radius: 10px 10px 0 0;
    background-color: ${style.color.ivory3};
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
`
const ImgNicknameContainer = styled.div`
  display: flex;
`
const ImgBox = styled.div`
  width: 50%;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>input{
    display: none;
  }
  &>label{
    border-radius: 10px 10px 0 0 !important;
  }
`

const AddImgBtn = styled.label`
  display: flex;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  background-color: #ffc123;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const ProfileImg = styled.img`
  width: 100%;
  max-height: ${style.layout.main.width/2};
  border-radius: 0 0 10px 10px !important;
`
const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  margin: ${style.layout.narrowMargin.height*3} ${style.layout.narrowMargin.width};
`

const BodyDetailContainer = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>div{
    text-align: center;
    margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    >span{
      display: inline-block;
      width: ${style.layout.header.height};
    }
    >input{
      width: ${style.layout.header.height/2};
    }
  }
  & label{
    margin: 0 ${style.layout.narrowMargin.width};
  }
`
const OpenOrClose = styled.span`
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>:first-child{
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
  &>:last-child{
    text-align: right;
    >label{
      margin-right: ${style.layout.wideMargin.width};
    }
  }
`

const SubmitBtn = styled.input`
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  background-color: #ffc123;
  border-radius: 10px;
  float: right;
`

function MyPage() {

  const [user,setUser] = useState({
    nickname : "nickname",
    height : 0,
    weight : 0,
    gender : "Q",
    age : 0,
    activity : 0
   })
  const [imgURL,setImgURL] = useState("https://media.discordapp.net/attachments/1144143589740400680/1151117333704749116/myPage_1.png?width=100&height=100")

  const loadProfile = ()=> {
    axios.get("http://43.201.194.176:8080/mypage/",{
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    .then(res=>setUser(res.data))
    .catch(err=>console.log(err,"서버접속 실패"))
  };

  useEffect(()=>loadProfile(),[])

  function sendUserData(e){
    e.preventDefault();
    axios.patch("http://43.201.194.176:8080/mypage/",{
      nickname : user.nickname,
      height : user.height,
      weight : user.weight,
      gender : user.gender,
      age : user.age,
      activity : 0
    },{
      headers:{
        Authorization: localStorage.getItem("Authorization")
      }
    })
    .then(res=>{
      console.log(res)
      alert("개인정보 설정이 변경되었습니다.");
    })
    .catch(err=>console.log(err,"서버와의 소통 실패"));
  };

  console.log(user);
  return (
    <Container>
      <form>
        <BlockContainer>
          <h2>프로필</h2>
          <ImgNicknameContainer>
            <ImgBox>
              <AddImgBtn htmlFor="addImg">이미지 추가하기</AddImgBtn>
              <input id="addImg" type="file" accept="image/png, image/jpeg" capture onChange={e=>setImgURL(e.target.value)}></input>
              <ProfileImg
                src={imgURL}
                alt="업로드한 이미지"
              ></ProfileImg>
            </ImgBox>
            <NicknameContainer>
              <div>닉네임</div>
              <input type="text" value={user.nickname} onChange={e=>setUser({...user,nickname: e.target.value})}></input>
            </NicknameContainer>
          </ImgNicknameContainer>
        </BlockContainer>

        <BlockContainer>
          <h2>바디프로필</h2>
          <BodyDetailContainer>
            <div>
              <label><input name="gender" type="radio" value="M" onClick={e=>setUser({...user,gender: e.target.value})} checked={user.gender==="M"? "checked" : null}></input> 남성</label>
              <label><input name="gender" type="radio" value="F" onClick={e=>setUser({...user,gender: e.target.value})} checked={user.gender==="F"? "checked" : null}></input> 여성</label>
            </div>
            <div><span>나이</span><input type="text" value={user.age} onChange={e=>setUser({...user,age: e.target.value})}></input></div>
            <div><span>키</span><input type="text" value={user.height} onChange={e=>setUser({...user,height: e.target.value})}></input></div>
            <div><span>몸무게</span><input type="text" value={user.weight} onChange={e=>setUser({...user,weight: e.target.value})}></input></div>
          </BodyDetailContainer>
          <OpenOrClose>
            <div>다른 사람들에게 나의 신체정보를 공개하겠습니까?</div>
            <div>
              <label htmlFor="YES"><input name="YESorNO" type="radio" id="YES" value={true}></input> YES</label>
              <label htmlFor="NO"><input name="YESorNO" type="radio" id="NO" value={false} checked="checked" ></input> NO</label>
            </div>
          </OpenOrClose>
        </BlockContainer>
        <SubmitBtn type="submit" onClick={sendUserData} value="SUBMIT"></SubmitBtn>
      </form>

      <section>

      </section>

      <section>

      </section>


    </Container>
  );
}
export default MyPage;
