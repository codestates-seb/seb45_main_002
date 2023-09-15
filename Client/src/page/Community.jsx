import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { styled } from "styled-components";

import Article from "../component/Article";
import SearchForm from "../component/SearchForm";

import useZustand from "../zustand/Store";

import style from "../style/style"

const CommunityContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
`;

const BtnContainer = styled.div`
  display: flex;
  width: ${style.layout.main.width-style.layout.wideMargin.width*2};
  justify-content: end;
  margin-bottom: ${style.layout.narrowMargin.height};
`;
const WriteBtn = styled.div`
  background-color: #ffc123;
  border: 0.5px solid;
  color: black;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  border-radius: 10px;
`

const Pagenation = styled.ul`
  list-style: none;
  display: flex;
  &>span{
    
    font-weight: bolder;
    color: rgb(0,0,0) !important;
    text-decoration: underline;
  }
`
const PageButton = styled.li`
  margin: ${style.layout.wideMargin.width};
  cursor: pointer;
  ${props=>props.className===props.nowPage? "color: rgb(0,0,0); text-decoration: underline;" : "color: rgb(50, 50, 50);"}
`

const CommunityList = () => {

  const [nowPage, setNowPage] = useState(1)
  const [articles, setArticles] = useState([
    {communityTitle: "게시물 제목 1", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 2", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333}
  ])
  function loadArticlesList(){
    axios.get("http://43.201.194.176:8080/community?page="+nowPage+"&size=5")
    .then(res=>{
      console.log(res, "글 목록 불러오기를 성공했습니다.")
      setArticles(res.data.data)
    })
    .catch(err=>console.log(err,"글 목록 불러오기를 실패했습니다."))
  }
  useEffect(loadArticlesList,[nowPage])

  function pagenation(e){
    setNowPage(e.target.innerText)
  }

  return (
    <CommunityContainer>
      <BtnContainer>
        <Link to="/pageswitch/community/write"><WriteBtn>글쓰기</WriteBtn></Link>
      </BtnContainer>
      {articles.map(article => (
        <Article
          article={article}
        />
      ))}
      <Pagenation>
        <PageButton onClick={()=>setNowPage(1)}>⇠</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 1 : Number(nowPage)-2} onClick={pagenation}>{nowPage<3? 1 : Number(nowPage)-2}</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 2 : Number(nowPage)-1} onClick={pagenation}>{nowPage<3? 2 : Number(nowPage)-1}</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 3 : Number(nowPage)} onClick={pagenation}>{nowPage<3? 3 : Number(nowPage)}</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 4 : Number(nowPage)+1} onClick={pagenation}>{nowPage<3? 4 : Number(nowPage)+1}</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 5 : Number(nowPage)+2} onClick={pagenation}>{nowPage<3? 5 : Number(nowPage)+2}</PageButton>
        <PageButton onClick={()=>setNowPage(1)}>⇢</PageButton>
      </Pagenation>
      <SearchForm />
    </CommunityContainer>
  );
};
export default CommunityList;
