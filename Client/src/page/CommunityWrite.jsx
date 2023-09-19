import { useState } from "react";
import { Link } from "react-router-dom";

import { styled } from "styled-components";

import axios from "axios"

import useZustand from "../zustand/Store";

import FavoriteDiet from "../component/FavoriteDiet";

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
  padding: 0 ${style.layout.main.width/10};
  &>div{
    display: flex;
    align-items: center;
    justify-content: center;
    >input{
      border: none;
      border-radius: 10px;
      margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
      padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    }
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
  &>:last-child{
    font-weight: bolder;
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

const ExitAndSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 ${style.layout.wideMargin.width};
  &>*{
    text-align: center;
    align-self: center;
    width: 60px;
    height: 20px;
    background-color: white;
    border-radius: 10px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
  &>:last-child{
    background-color: #ffc123;
  }
`

const FavoriteDietListModalContainer = styled.section`
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  background-color: rgba(127,127,127,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`
const FavoriteDietListModalBox = styled.ul`
  list-style: none;
  background-color: #5cffa3;
  width: ${style.layout.main.width*4/5};
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
`

function CommunityWrite(){

  const [form,setForm] = useState({
    communityTitle: "",
    communityImg: "https://img.freepik.com/free-photo/front-view-delicious-cheeseburger-with-meat-tomatoes-green-salad-dark-background-sandwich-fast-food-meal-dish-french-fries-dinner_140725-156241.jpg?w=1480&t=st=1694570873~exp=1694571473~hmac=bf25d456d2680654d8a8aa0b398c08ba1c34d0ab50910592000964044c7d6241",
    communityContent: "",
    communityDietDate: Date()
  })
  
  const [dietData, setDietData] = useState({})

  const [mealMorning, setMealMorning] = useState({})
  const [morningMenu, setMorningMenu] = useState([])

  const [mealLunch, setMealLunch] = useState({})
  const [lunchMenu,setLunchMenu] = useState([])

  const [mealDinner, setMealDinner] = useState({})
  const [dinnerMenu,setDinnerMenu] = useState([])

  const [analysis,setAnalysis] = useState("")

  const [onImg,setOnImg] = useState("")
  const [favorites, setFavorites] = useState([])

  const communityId = useZustand.useCommunityId(state=>state.communityId)

//////// 캘린더로 식단 불러오기
  function loadDietInDate(){
    if(form.communityDietDate){
      axios.get("http://43.201.194.176:8080/dailymeals/date/"+form.communityDietDate,{
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      .then(res=>{
        console.log(res.data) // 하루(데일리) 총 식단에 대한 정보
        setDietData(res.data)

        console.log(res.data.eachMeals) // 하루(데일리) 각 끼니들을 배열형태로
        console.log(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===1)) // 아침 식사(eachMeal) 식단에 대한 정보
        setMealMorning(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===1))
        res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===1).quantityfoods.forEach(menu=>setMorningMenu(prev=>[...prev, menu]))
  
        setMealLunch(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===2))
        res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===2).quantityfoods.forEach(menu=>setLunchMenu(prev=>[...prev, menu]))
        
        setMealDinner(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===3))
        res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===3).quantityfoods.forEach(menu=>setDinnerMenu(prev=>[...prev, menu]))
        axios.post("http://43.201.194.176:8080/analysis/"+res.data.dailyMealId,null,{
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(res=>{
          axios.get("http://43.201.194.176:8080/analysis/"+res.data.analysisId,{
            headers: {
              Authorization: localStorage.getItem("Authorization")
            }
          })
          .then(res=>setAnalysis(res.data.result))
          .catch(err=>console.log(err,"분석 가져오기 실패"))
        })
        .catch(err=>console.log(err,"분석 실패"))
      })
      .catch(err=>console.log(err, "서버와 소통에 실패했습니다."))
    }
    else{
      alert("날짜를 선택해주시기 바랍니다.")
    }
  }
console.log(morningMenu)
//////// 선호 식단 불러오기
  const [openModal, setOpenModal] = useState(false)
  function openFavoriteListModal(){
    // axios.get("http://43.201.194.176:8080/analysis/"+analysisId)
    axios.get("http://43.201.194.176:8080/dailymeals?page=1&size=100", {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      }
    })
    .then(res=>setFavorites(res.data.content))
    .catch(err=>console.log(err, "선호식단리스트 불러오기를 실패했습니다."));
    setOpenModal(!openModal)
  }
  function loadDietInFavorite(){
    axios.get("http://43.201.194.176:8080/dailymeals/"+dietData.dailyMealId,{
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    .then(res=>{
      console.log(res.data) // 하루(데일리) 총 식단에 대한 정보
      setDietData(res.data)

      console.log(res.data.eachMeals) // 하루(데일리) 각 끼니들을 배열형태로
      console.log(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===1)) // 아침 식사(eachMeal) 식단에 대한 정보
      setMealMorning(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===1))
      res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===1).quantityfoods.forEach(menu=>setMorningMenu(prev=>[...prev, menu])) // prev는 렌더링이 너무 자주 일어난다. 다른 방법으로는 배열 하나를 만들어서 push 하는 방법이 있을 것 같다.
      
      setMealLunch(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===2))
      res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===2).quantityfoods.forEach(menu=>setLunchMenu(prev=>[...prev, menu]))
      
      setMealDinner(res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===3))
      res.data.eachMeals.find(eachMeal=>eachMeal.timeSlots===3).quantityfoods.forEach(menu=>setDinnerMenu(prev=>[...prev, menu]))
    })
    .catch(err=>console.log(err, "선택된 선호데이터 불러오기를 실패했습니다."))
  }

  // 게시글 등록하기
  function sendArticle(e){
    if(form.communityTitle===""){
      alert("제목을 입력해주시기 바랍니다.")
    }
    else if(form.communityContent===""){
      alert("본문 내용을 입력해주시기 바랍니다.")
    }
    else{
      if(communityId){
        axios.patch("http://43.201.194.176:8080/community/"+communityId,{
          communityTitle: form.communityTitle,
          communityContent: form.communityContent,
          dailyMealId: dietData.dailyMealId
        },{
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(res=>window.location.reload())
        .catch(err=>console.log(err))
      }
      else{
        axios.post("http://43.201.194.176:8080/community",{
          communityTitle: form.communityTitle,
          communityContent: form.communityContent+"AnAlYsIs"+analysis,
          dailyMealId: dietData.dailyMealId
        },{
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(res=>window.location.reload())
        .catch(err=>console.log(err, "게시물 등록에 실패했습니다."))
      }
    }
  }

  return(
    <WriteFormContainer>

      <TitleContainer>
        <input placeholder="제목" value={form.communityTitle} onChange={e=>setForm({...form,communityTitle: e.target.value})} autoFocus/>
      </TitleContainer>

      <DietBtnContainer>
        <DietBtnBox>
          <div>
            <input id="addDiet" type="date" value={form.communityDietDate} onChange={e=>setForm({...form,communityDietDate: String(e.target.value)})}></input>
            <DietBtn htmlFor="addDiet" onClick={loadDietInDate}>캘린더에서<br />불러오기</DietBtn>
          </div>
          <DietBtn onClick={openFavoriteListModal}>내 선호식단<br />리스트에서 불러오기</DietBtn>
        </DietBtnBox>

        <DietInfoContainer>
            <div>
              <span>아침</span>
              <Info>
                <div><span>식단명</span><span>: {morningMenu[0]? morningMenu.map(menu=>menu.foodName? menu.foodName+" " : menu+" ") : null}</span></div>
                <div><span>칼로리</span><span>: {morningMenu[0]? mealMorning.totalEachKcal : null} Kcal</span></div>
                <div><span>지방</span><span>: {morningMenu[0]? mealMorning.totalEachFat : null} g</span></div>
                <div><span>단백질</span><span>: {morningMenu[0]? mealMorning.totalEachProtein : null} g</span></div>
                <div><span>탄수화물</span><span>: {morningMenu[0]? mealMorning.totalEachCarbo : null} g</span></div>
              </Info>
            </div>
            <div>
              <span>점심</span>
              <Info>
                <div><span>식단명</span><span>: {lunchMenu[0]? lunchMenu.map(menu=>menu.foodName? menu.foodName+" " : menu+" ") : null}</span></div>
                <div><span>칼로리</span><span>: {lunchMenu[0]? mealLunch.totalEachKcal : null} Kcal</span></div>
                <div><span>지방</span><span>: {lunchMenu[0]? mealLunch.totalEachFat : null} g</span></div>
                <div><span>단백질</span><span>: {lunchMenu[0]? mealLunch.totalEachProtein : null} g</span></div>
                <div><span>탄수화물</span><span>: {lunchMenu[0]? mealLunch.totalEachCarbo : null} g</span></div>
              </Info>
            </div>
            <div>
              <span>저녁</span>
              <Info>
                <div><span>식단명</span><span>: {dinnerMenu[0]? dinnerMenu.map(menu=>menu.foodName? menu.foodName+" " : menu+" ") : null}</span></div>
                <div><span>칼로리</span><span>: {dinnerMenu[0]? mealDinner.totalEachKcal : null} Kcal</span></div>
                <div><span>지방</span><span>: {dinnerMenu[0]? mealDinner.totalEachFat : null} g</span></div>
                <div><span>단백질</span><span>: {dinnerMenu[0]? mealDinner.totalEachProtein : null} g</span></div>
                <div><span>탄수화물</span><span>: {dinnerMenu[0]? mealDinner.totalEachCarbo : null} g</span></div>
              </Info>
            </div>
            <div>
              <span>총 평가</span>
              <Info>
                {/* <div><span>식단명</span><span>: {dietData.foodName}</span></div> */}
                <div><span>칼로리</span><span>: {dietData.totalDailyKcal} Kcal</span></div>
                <div><span>지방</span><span>: {dietData.totalDailyFat} g</span></div>
                <div><span>단백질</span><span>: {dietData.totalDailyProtein} g</span></div>
                <div><span>탄수화물</span><span>: {dietData.totalDailyCarbo} g</span></div>
              </Info>
            </div>
        </DietInfoContainer>

        {/* <ImgContainer>
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
          초과된 칼로리 : -1949.0<br />
          초과된 탄수화물 : 4.0 (1.33%)<br />
          초과된 단백질 : -4.0 (-0.8%)<br />
          초과된 지방 : 0.0 (0.0%)<br />
          총 평 : 칼로리 평가 불량 섭취 칼로리 양이 너무 높습니다. 3대 영양소 비율 평가 양호<br />
        </ImgContainer> */}
      </DietBtnContainer>
        
      <ContentContainer>
        <textarea placeholder="내용" value={form.communityContent} onChange={e=>{setForm({...form,communityContent: e.target.value})}} />
      </ContentContainer>

      <ExitAndSubmit>
        <Link to="/pageswitch/community">Exit</Link>
        <Link to="/pageswitch/community" onClick={sendArticle}>Submit</Link>
      </ExitAndSubmit>

      {openModal?
        <FavoriteDietListModalContainer onClick={(e)=>{e.preventDefault();setOpenModal(!openModal);}}>
          <FavoriteDietListModalBox>
            {favorites.map(favorite=>(
              <FavoriteDiet favorite={favorite} dietData={dietData} setDietData={setDietData} openModal={openModal} setOpenModal={setOpenModal} loadDietInFavorite={loadDietInFavorite} />
            ))}
          </FavoriteDietListModalBox>
        </FavoriteDietListModalContainer>
        :
        null}
    </WriteFormContainer>
  );
};
export default CommunityWrite;