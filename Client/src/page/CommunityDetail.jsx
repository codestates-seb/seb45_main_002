import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { styled } from "styled-components";
import axios from "axios";

import Comments from "../component/Comments";

import useZustand from "../zustand/Store";

import style from "../style/style"

const Container = styled.article`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
`;

const Title = styled.h1`
  border: solid 1px orange;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  text-align: center;
`;

const DietImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  & > img {
    border: 1px solid black;
    border-radius: 15px;
  }
`;

const DietInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }
`;
const TimeContainer = styled.div`
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: small;
`
const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px orange;
  border-bottom: none !important;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>:first-child{
    text-align: center;
    margin-bottom: ${style.layout.narrowMargin.height};
  }
`
const InfoBox = styled.div`
  border: solid 1px orange;
  border-top: none !important;
  padding-bottom: ${style.layout.narrowMargin.height};
`

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px orange;
  font-weight: bolder;
  &>:first-child{
    text-align: center;
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width} 0;
  }
  &>:last-child{
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 50%;
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
`

const OneLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${style.layout.narrowMargin.width};
`

const Content = styled.div`
  border: solid 1px orange;
  margin: ${style.layout.narrowMargin.height} ${style.layout.wideMargin.width};
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
`;

const CommentsAndUserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
  border: solid 1px orange;
`
const CommentsOpener = styled.span`
  &>:first-child{
    margin-right: ${style.layout.wideMargin.width};
    cursor: pointer;
  }
  &>:last-child{
    cursor: pointer;
  }
`
const UserProfile = styled.span`
  
`
const CommentsBox = styled.section`
  padding: 0 ${style.layout.wideMargin.width};
  margin-bottom: ${style.layout.wideMargin.height};
  ${props=>props.className==="false"? "display: none;" : ""}
`
const CommentsWriteBox = styled.div`
  display: flex;
  justify-content: center;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  &>input{
    width: ${style.layout.main.width-style.layout.wideMargin.width*8};
  }
  &>button{
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    background-color: orange;
    cursor: pointer;
  }
`
const CommentsListBox = styled.ul`
  list-style: none;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
`

const ExitAndModify = styled.div`
  display: flex;
  justify-content: space-between;
  &>a{
    margin: ${style.layout.narrowMargin.height};
    color: gray;
    font-size: small;
  }
`

const DeleteButton = styled.input`
  background-color: red;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`

function CommunityDetail(){
  const [member, setMember] = useState({})
  const [detail, setDetail] = useState({})

  const [dailyMeals, setDailyMeals] = useState({})

  const [morningInfo, setMorningInfo] = useState({})
  const [morningMenu, setMorningMenu] = useState([])

  const [lunchInfo, setLunchInfo] = useState({})
  const [lunchMenu, setLunchMenu] = useState([])

  const [dinnerInfo, setDinnerInfo] = useState({})
  const [dinnerMenu, setDinnerMenu] = useState([])

  const [comment, setComment] = useState({
    newComment: "",
    commentList: []
  })
  const [hide,setHide] = useState(false)
  const params = useParams();
  const setCommunityId = useZustand.useCommunityId(state=>state.setCommunityId)

  const navigate = useNavigate()

  function loadDetail(){
    setCommunityId(params["*"])
    axios.get("http://43.201.194.176:8080/community/"+params["*"])
    .then(res=>{
      setMember(res.data.member) // 게시글 작성자에 대한 정보(닉네임 등)

      console.log(res.data)
      setDetail(res.data) // 게시글에 대한 정보(제목, 본문, 댓글 등)

      setComment({...comment,commentList: res.data.communityCommentList}) // 작성되어있던 댓글들
      
      console.log(res.data.dailyMeal)
      setDailyMeals(res.data.dailyMeal) // 하루 식단 정보

      setMorningInfo(res.data.dailyMeal.eachMeals.find(eachMeal=>eachMeal.timeSlot===1)) // 아침 식사 정보
      res.data.dailyMeal.eachMeals.find(eachMeal=>eachMeal.timeSlot===1).eachMealFoods.forEach(menu=>setMorningMenu(prev=>[...prev,menu])) // 아침 식사 메뉴 이름

      setLunchInfo(res.data.dailyMeal.eachMeals.find(eachMeal=>eachMeal.timeSlot===2)) // 점심 식사 정보
      res.data.dailyMeal.eachMeals.find(eachMeal=>eachMeal.timeSlot===2).eachMealFoods.forEach(menu=>setLunchMenu(prev=>[...prev,menu])) // 점심 식사 메뉴 이름

      setDinnerInfo(res.data.dailyMeal.eachMeals.find(eachMeal=>eachMeal.timeSlot===3)) // 저녁 식사 정보
      res.data.dailyMeal.eachMeals.find(eachMeal=>eachMeal.timeSlot===3).eachMealFoods.forEach(menu=>setDinnerMenu(prev=>[...prev,menu])) // 저녁 식사 메뉴 이름
    })
    .catch(err=>console.log(err, "게시글 데이터를 불러오지 못했습니다."))
  }
  useEffect(()=>loadDetail(),[])
console.log(morningMenu)
  function sendLike(){
    axios.get("http://43.201.194.176:8080/community/recommendation/"+params["*"],{
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    .then(res=>{
      loadDetail()
    })
    .catch(err=>console.log(err, "좋아요 변경 실패"))
  }

  function sendComment(){
    axios.post("http://43.201.194.176:8080/communitycomment",{
      communityId: params["*"],
      communityCommentContent: comment.newComment
    },{
        headers:{
          Authorization: localStorage.getItem("Authorization")
        }
      }
    )
    .then(res=>window.location.reload())
    .catch(err=>console.log(err, "댓글등록 실패"))
  }

  function articleDelete(){
    axios.delete("http://43.201.194.176:8080/community/"+params["*"],{
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    .then(res=>{
      console.log(res, "게시글 삭제 성공했습니다.");
      navigate("/pageswitch/community")
    })
    .catch(err=>console.log(err, "게시글 삭제 실패했습니다."))
  }

  return (
    <Container>
      <Title>
        {detail.communityTitle}
      </Title>
      <div>
        <DietImageContainer>
          <img
           src="https://img.freepik.com/free-photo/front-view-delicious-cheeseburger-with-meat-tomatoes-green-salad-dark-background-sandwich-fast-food-meal-dish-french-fries-dinner_140725-156241.jpg?w=1480&t=st=1694570873~exp=1694571473~hmac=bf25d456d2680654d8a8aa0b398c08ba1c34d0ab50910592000964044c7d6241"
           alt="dietimg"
           width={style.layout.main.width/2}
          />
        </DietImageContainer>
        <DietInfoContainer>
          <TimeContainer>
            <MenuBox>
              <div>아침</div>
              <div>
                <OneLine>
                  <span>메뉴</span>
                  <span>
                    {morningMenu.map(menu=>(<div>{menu.food.foodName+" "}</div>))}
                  </span>
                </OneLine>
              </div>
            </MenuBox>
            <MenuBox>
              <div>점심</div>
              <div>
                <OneLine>
                  <span>메뉴</span>
                  <span>
                    {lunchMenu.map(menu=>(<div>{menu.food.foodName+" "}</div>))}
                  </span>
                </OneLine>
              </div>
            </MenuBox>
            <MenuBox>
              <div>저녁</div>
              <div>
                <OneLine>
                  <span>메뉴</span>
                  <span>
                    {dinnerMenu.map(menu=>(<div>{menu.food.foodName+" "}</div>))}
                  </span>
                </OneLine>
              </div>
            </MenuBox>

            <InfoBox>
              <OneLine>
                <span>칼로리</span>
                <span>{morningInfo.totalEachKcal} kcal</span>
              </OneLine>
              <OneLine>
                <span>단백질</span>
                <span>{morningInfo.totalEachProtein} g</span>
              </OneLine>
              <OneLine>
                <span>탄수화물</span>
                <span>{morningInfo.totalEachCarbo} g</span>
              </OneLine>
              <OneLine>
                <span>지방</span>
                <span>{morningInfo.totalEachFat} g</span>
              </OneLine>
            </InfoBox>
            <InfoBox>
              <OneLine>
                <span>칼로리</span>
                <span>{lunchInfo.totalEachKcal} kcal</span>
              </OneLine>
              <OneLine>
                <span>단백질</span>
                <span>{lunchInfo.totalEachProtein} g</span>
              </OneLine>
              <OneLine>
                <span>탄수화물</span>
                <span>{lunchInfo.totalEachCarbo} g</span>
              </OneLine>
              <OneLine>
                <span>지방</span>
                <span>{lunchInfo.totalEachFat} g</span>
              </OneLine>
            </InfoBox>
            <InfoBox>
              <OneLine>
                <span>칼로리</span>
                <span>{dinnerInfo.totalEachKcal} kcal</span>
              </OneLine>
              <OneLine>
                <span>단백질</span>
                <span>{dinnerInfo.totalEachProtein} g</span>
              </OneLine>
              <OneLine>
                <span>탄수화물</span>
                <span>{dinnerInfo.totalEachCarbo} g</span>
              </OneLine>
              <OneLine>
                <span>지방</span>
                <span>{dinnerInfo.totalEachFat} g</span>
              </OneLine>
            </InfoBox>

          </TimeContainer>
          <TotalBox>
            <div>일일 섭취량</div>
            <div>
              <OneLine>
                <span>칼로리</span>
                <span>{dailyMeals.totalDailyKcal} kcal</span>
              </OneLine>
              <OneLine>
                <span>단백질</span>
                <span>{dailyMeals.totalDailyProtein} g</span>
              </OneLine>
              <OneLine>
                <span>탄수화물</span>
                <span>{dailyMeals.totalPercentCarbos} g</span>
              </OneLine>
              <OneLine>
                <span>지방</span>
                <span>{dailyMeals.totalDailyFat} g</span>
              </OneLine>
            </div>
          </TotalBox>
        </DietInfoContainer>
      </div>
      <Content>
        {detail.communityContent}
      </Content>
      <CommentsAndUserProfile>
        <CommentsOpener>
          <span onClick={sendLike}>
            {detail.communityLike? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}좋아요 {detail.recommendationCount}
          </span>
          <span onClick={()=>setHide(!hide)}>
            <i className="fa-solid fa-comment"></i>댓글보기
            {hide? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}
          </span>
        </CommentsOpener>
        <UserProfile>
          작성자 : {member.nickname}
        </UserProfile>
      </CommentsAndUserProfile>
        <CommentsBox className={String(hide)}>
          <CommentsWriteBox>
            <input type="text" value={comment.newComment} onChange={e=>setComment({...comment,newComment: e.target.value})}></input>
            <button onClick={sendComment}>등록</button>
          </CommentsWriteBox>
          <CommentsListBox>
            {comment.commentList.map(comment=>(
              <Comments comment={comment} />
            ))}
          </CommentsListBox>
        </CommentsBox>
      <ExitAndModify>
        <Link to="/pageswitch/community">목록으로 돌아가기</Link>
        <Link
          to={
            localStorage.getItem("Authorization")?
            "/pageswitch/community/write" : "/pageswitch/community/"+params["*"]
          }
          onClick={e=>{
            localStorage.getItem("Authorization")? console.log("") : alert("본인이 작성한 게시물만 수정할 수 있습니다.")
          }}
        >
          게시글 수정하기
        </Link>
      </ExitAndModify>
      <DeleteButton type="button" value="게시글 삭제하기" onClick={articleDelete}></DeleteButton>
    </Container>
  );
};
export default CommunityDetail;
