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
`
const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px orange;
  &>:first-child{
    text-align: center;
    margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
  &>:last-child{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
`
const InfoName = styled.div`
  text-align: center;
`
const FoodInfo = styled.div`
  text-align: right;
  &>*{
    padding: 0 ${style.layout.narrowMargin.width};
  }
`;
const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px orange;
  font-weight: bolder;
  &>:last-child{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-self: center;
    width: 50%;
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
`
const TotalTitle = styled.div`
  text-align: center;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
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
  const [detail, setDetail] = useState({})
  const [member, setMember] = useState({})
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
      console.log(res)
      setComment({...comment,commentList: res.data.communityCommentList})
      setDetail(res.data)
      setMember(res.data.member)
    })
    .catch(err=>console.log(err, "게시글 데이터를 불러오지 못했습니다."))
  }
  useEffect(()=>loadDetail(),[])

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
            <TimeBox>
              <div>아침</div>
              <div>
                <InfoName>
                  <div>칼로리</div>
                  <div>단백질</div>
                  <div>탄수화물</div>
                  <div>지방</div>
                </InfoName>
                <FoodInfo>
                  <div>{data1.totalDailyKcal}</div>
                  <div>{data1.totalDailyProtein}</div>
                  <div>{data1.totalDailyCarbo}</div>
                  <div>{data1.totalDailyFat}</div>
                </FoodInfo>
                <span>
                  <div>kcal</div>
                  <div>g</div>
                  <div>g</div>
                  <div>g</div>
                </span>
              </div>
            </TimeBox>
            <TimeBox>
              <div>점심</div>
              <div>
                <InfoName>
                  <div>칼로리</div>
                  <div>단백질</div>
                  <div>탄수화물</div>
                  <div>지방</div>
                </InfoName>
                <FoodInfo>
                  <div>{data1.totalDailyKcal}</div>
                  <div>{data1.totalDailyProtein}</div>
                  <div>{data1.totalDailyCarbo}</div>
                  <div>{data1.totalDailyFat}</div>
                </FoodInfo>
                <span>
                  <div>kcal</div>
                  <div>g</div>
                  <div>g</div>
                  <div>g</div>
                </span>
              </div>
            </TimeBox>
            <TimeBox>
              <div>저녁</div>
              <div>
                <InfoName>
                  <div>칼로리</div>
                  <div>단백질</div>
                  <div>탄수화물</div>
                  <div>지방</div>
                </InfoName>
                <FoodInfo>
                  <div>{data1.totalDailyKcal}</div>
                  <div>{data1.totalDailyProtein}</div>
                  <div>{data1.totalDailyCarbo}</div>
                  <div>{data1.totalDailyFat}</div>
                </FoodInfo>
                <span>
                  <div>kcal</div>
                  <div>g</div>
                  <div>g</div>
                  <div>g</div>
                </span>
              </div>
            </TimeBox>
          </TimeContainer>
          <TotalBox>
            <TotalTitle>총</TotalTitle>
            <div>
              <InfoName>
                <div>칼로리</div>
                <div>단백질</div>
                <div>탄수화물</div>
                <div>지방</div>
              </InfoName>
              <FoodInfo>
                {/* <div>{detail.dailyMeal.totalDailyKcal}</div>
                <div>{detail.dailyMeal.totalDailyProtein}</div>
                <div>{detail.dailyMeal.totalDailyCarbo}</div>
                <div>{detail.dailyMeal.totalDailyFat}</div> */}
              </FoodInfo>
              <span>
                  <div>kcal</div>
                  <div>g</div>
                  <div>g</div>
                  <div>g</div>
              </span>
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
            <i className="fa-solid fa-heart"></i>좋아요 {detail.recommendationCount}
            {/* <i className="fa-thin fa-heart"></i> */}
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
        <Link to="/pageswitch/community/write">게시글 수정하기</Link>
      </ExitAndModify>
      <DeleteButton type="button" value="게시글 삭제하기" onClick={articleDelete}></DeleteButton>
    </Container>
  );
};
export default CommunityDetail;
