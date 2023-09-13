import { useState } from "react";
import { styled } from "styled-components";

import axios from "axios"

import style from "../style/style"

const WriteFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
`;

const TitleContainer = styled.h1`
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>input{
    width: 100%;
  }
`;

const DietBtnContainer = styled.div`
`;
const DietBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &>input{
    border: none;
    border-radius: 10px;
    margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
`
const DietBtn = styled.label`
  display: flex;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  background-color: #ffc123;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const DietInfoContainer = styled.div`
  background-color: white;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>div{
    display: flex;
    margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
  &>div>:first-child{
    width: 25%;
    text-align: center;
    margin-right: ${style.layout.wideMargin.width};
    border-right: solid 1px orange;
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
`;
const Info = styled.span`
  width: 100%;
  &>div{
    display: flex;
    >:first-child{
      width: 25%;
      margin-right: ${style.layout.wideMargin.width};
      margin-bottom: ${style.layout.narrowMargin.height};
    }
  }
`

const ImgContainer = styled.div`
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>input{
    display: none;
  }
  &>label{
    border-radius: 10px 10px 0 0 !important;
  }
`
const ImgBox = styled.img`
  width: 100%;
  border-radius: 0 0 10px 10px !important;
`
const NoImgBox = styled.div`
  display: flex;
  background-color: white;
  width: 100%;  height: ${style.layout.main.width/2};
  border-radius: 0 0 10px 10px !important;
  align-items: center;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 100%;
  height: 70%;
  /* border: 1px solid red; */
  padding: 0.5rem;
  & > textarea {
    width: 100%;
    height: 40vh;
    max-height: 70%;
    vertical-align: top;
  }
`;
const SubmitBtn = styled.input`
  display: flex;
  width: 60px;
  height: 20px;
  background-color: #ffc123;
  border-radius: 10px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

function CommunityWrite(){

  const [form,setForm] = useState({
    communityTitle: "",
    communityImg: "https://img.freepik.com/free-photo/front-view-delicious-cheeseburger-with-meat-tomatoes-green-salad-dark-background-sandwich-fast-food-meal-dish-french-fries-dinner_140725-156241.jpg?w=1480&t=st=1694570873~exp=1694571473~hmac=bf25d456d2680654d8a8aa0b398c08ba1c34d0ab50910592000964044c7d6241",
    communityContent: "",
    communityDietDate: Date()
  })

  const [onImg,setOnImg] = useState("")

  const data1 = {
    dailyMealId: 320,
    memberId: 21,
    date: "2023-09-13",
    name: "yongmins",
    favorite: false,
    eachMeals: [11],
    totalDailyKcal: 184.0,
    totalDailyCarbo: 31.0,
    totalDailyProtein: 3.0,
    totalDailyFat: 5.0
}

  function loadDietInDate(){
    axios.get("http://43.201.194.176:8080/dailymeals/date/"+form.communityDietDate)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }

  function sendArticle(e){
    e.preventDefault()
    if(form.communityTitle===""){
      alert("제목을 입력해주시기 바랍니다.")
    }
    else if(form.communityContent===""){
      alert("본문 내용을 입력해주시기 바랍니다.")
    }
    else{
      axios.post("http://43.201.194.176:8080/community",{
        date: form.communityDietDate,
        communityTitle: form.communityTitle,
        communityContent: form.communityContent,
        imgURL: form.communityImg,
        eachMealsM: 11,
        eachMealsL: 24,
        eachMealsD: 5
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
      }
    }

  return(
    <WriteFormContainer>

      <TitleContainer>
        <input placeholder="제목" value={form.communityTitle} onChange={e=>setForm({...form,communityTitle: e.target.value})}/>
      </TitleContainer>

      <DietBtnContainer>
        <DietBtnBox>
          <input id="addDiet" type="date" value={form.communityDietDate} onChange={e=>setForm({...form,communityDietDate: e.target.value})}></input>
          <DietBtn htmlFor="addDiet" onClick={loadDietInDate}>식단 불러오기</DietBtn>
        </DietBtnBox>

        <DietInfoContainer>
            <div>
              <span>아침</span>
              <Info>
                <div><span>식단명</span><span>: {data1.eachMeals}</span></div>
                <div><span>칼로리</span><span>: {data1.totalDailyKcal} Kcal</span></div>
                <div><span>지방</span><span>: {data1.totalDailyFat} mg</span></div>
                <div><span>단백질</span><span>: {data1.totalDailyProtein} mg</span></div>
                <div><span>탄수화물</span><span>: {data1.totalDailyCarbo} mg</span></div>
              </Info>
            </div>
            <div>
              <span>점심</span>
              <Info>
                <div><span>식단명</span><span>: </span></div>
                <div><span>칼로리</span><span>: </span></div>
                <div><span>지방</span><span>: </span></div>
                <div><span>단백질</span><span>: </span></div>
                <div><span>탄수화물</span><span>: </span></div>
              </Info>
            </div>
            <div>
              <span>저녁</span>
              <Info>
                <div><span>식단명</span><span>: </span></div>
                <div><span>칼로리</span><span>: </span></div>
                <div><span>지방</span><span>: </span></div>
                <div><span>단백질</span><span>: </span></div>
                <div><span>탄수화물</span><span>: </span></div>
              </Info>
            </div>
            <div>
              <span>총 평가</span>
              <Info>
                <div><span>식단명</span><span>: </span></div>
                <div><span>칼로리</span><span>: </span></div>
                <div><span>지방</span><span>: </span></div>
                <div><span>단백질</span><span>: </span></div>
                <div><span>탄수화물</span><span>: </span></div>
              </Info>
            </div>
        </DietInfoContainer>

        <ImgContainer>
          <DietBtn htmlFor="addImg">이미지 추가하기</DietBtn>
          <input id="addImg" type="file" accept="image/png, image/jpeg" capture onChange={e=>setOnImg(e.target.value)}></input>
          {onImg?
            <ImgBox
              src={form.communityImg}
              alt="업로드한 식단 이미지"
            ></ImgBox>
            :
            <NoImgBox>
              이미지를 추가하시면 미리보기용 이미지가 보여집니다.
            </NoImgBox>
          }
        </ImgContainer>
      </DietBtnContainer>
        
      <ContentContainer>
        <textarea placeholder="내용" value={form.communityContent} onChange={e=>{setForm({...form,communityContent: e.target.value})}} />
      </ContentContainer>

      <SubmitBtn type="submit" value="SUBMIT" onClick={sendArticle}></SubmitBtn>
    </WriteFormContainer>
  );
};
export default CommunityWrite;
