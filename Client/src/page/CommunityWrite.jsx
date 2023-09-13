import { useState } from "react";
import { styled } from "styled-components";

import axios from "axios"

import style from "../style/style"

const WriteFormContainer = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 100%;
  height: 100vh;
  /* border: 1px solid black; */
  background-color: #efefef;
  padding: 10px;
`;

const TitleContainer = styled.h1`
  width: 100%;
  height: 5%;
  /* border: 1px solid black; */
  padding: 0.5rem;

  & > input {
    width: 100%;
  }
`;

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

const DietContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  /* border: 1px solid red; */
`;

const DietImageContainer = styled.div`
  display: flex;
  width: 30%;
  /* border: 1px solid blue; */
  justify-content: center;
  align-items: center;

  & > img {
    width: 90%;
    height: 90%;
    border: 1px solid black;
    border-radius: 15px;
    margin: 0 auto;
  }
`;

const DietInfoContainer = styled.div`
  width: 70%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding-left: 20px;

  & > div {
    display: flex;
    width: 100%;
    height: 30%;
    /* border: 1px solid red; */
  }
`;

const FoodInfo = styled.div`
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  height: 100%;
  /* border: 1px solid red; */
`;

const DietBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  &>*{
    display: flex;
  }
  &>:nth-child(2){
    display: none;
  }
  &>:last-child{
    align-items: center;
    >:first-child{
    border: none;
    border-radius: 10px;
    height: 50%;
    }
  }
`;

const DietBtn = styled.label`
  display: flex;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  background-color: #ffc123;
  color: black;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
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

  function loadDietInDate(){
    axios.get("http://43.201.194.176:8080/dailymeals"+form.communityDietDate)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }

  return(
    <WriteFormContainer>
      <TitleContainer>
        <input placeholder="제목" value={form.communityTitle} onChange={e=>setForm({...form,communityTitle: e.target.value})}/>
      </TitleContainer>
      <DietBtnContainer>
        <DietBtn htmlFor="addImg">이미지 추가하기</DietBtn>
        <input id="addImg" type="file" accept="image/png, image/jpeg" capture></input>
        <span>
          <input id="addDiet" type="date" value={form.communityDietDate} onChange={e=>setForm({...form,communityDietDate: e.target.value})}></input>
          <DietBtn htmlFor="addDiet" onClick={loadDietInDate}>식단 불러오기</DietBtn>
          </span>
      </DietBtnContainer>
      <DietContainer>
        <DietImageContainer>
          <img
           src="https://img.freepik.com/free-photo/front-view-delicious-cheeseburger-with-meat-tomatoes-green-salad-dark-background-sandwich-fast-food-meal-dish-french-fries-dinner_140725-156241.jpg?w=1480&t=st=1694570873~exp=1694571473~hmac=bf25d456d2680654d8a8aa0b398c08ba1c34d0ab50910592000964044c7d6241"
           alt="업로드한 식단 이미지"
          />
        </DietImageContainer>
        <DietInfoContainer>
          <div>
            아침
            <FoodInfo>XXX</FoodInfo>
          </div>
          <div>
            점심
            <FoodInfo>YYY</FoodInfo>
          </div>
          <div>
            저녁 <FoodInfo>ZZZ</FoodInfo>
          </div>
          <div>
            총 <FoodInfo>XYZXYZ</FoodInfo>
          </div>
        </DietInfoContainer>
      </DietContainer>
      <ContentContainer>
        <textarea placeholder="내용" value={form.communityContent} onChange={e=>{setForm({...form,communityContent: e.target.value})}} />
        <SubmitBtn type="submit">SUBMIT</SubmitBtn>
      </ContentContainer>
    </WriteFormContainer>
  );
};
export default CommunityWrite;
