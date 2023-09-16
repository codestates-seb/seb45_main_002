import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { styled } from "styled-components";

import useZustand from "../zustand/Store";

import Article from "../component/Article";

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
  ${props=>props.className===Number(props.nowPage)? "color: rgb(0,0,0); font-weight: bolder; text-decoration: underline;" : "color: rgb(100, 100, 100);"}
`

const CommunityList = () => {

  const [nowPage, setNowPage] = useState(1)
  const [pageInfo, setPageInfo] = useState({})
  const [articles, setArticles] = useState([
    {communityTitle: "게시물 제목 1", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 2", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333},
    {communityTitle: "게시물 제목 3", communityLike: 525, community_createdAt: "2023-08-29", communityViewCount: 333}
  ])
  const [searchTerm, setSearchTerm] = useState("");
  const setCommunityId = useZustand.useCommunityId(state=>state.setCommunityId)

  function loadArticlesList(){
    setCommunityId("")
    axios.get("http://43.201.194.176:8080/community/title-search?keyword="+searchTerm+"&page="+nowPage+"&size=5")
    .then(res=>{
      setPageInfo(res.data.pageInfo)
      setArticles(res.data.data)
    })
    .catch(err=>console.log(err, "검색기능 실패"))
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
        <PageButton
         nowPage={nowPage}
         className={
          nowPage<3? 1 :
            (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-4 : Number(nowPage)-2)
         }
         onClick={pagenation}>
          {
            nowPage<3? 1 :
              (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-4 : Number(nowPage)-2)
          }
        </PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 2 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-3 : Number(nowPage)-1)} onClick={pagenation}>{nowPage<3? 2 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-3 : Number(nowPage)-1)}</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 3 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-2 : Number(nowPage))} onClick={pagenation}>{nowPage<3? 3 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-2 : Number(nowPage))}</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 4 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-1 : Number(nowPage)+1)} onClick={pagenation}>{nowPage<3? 4 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-1 : Number(nowPage)+1)}</PageButton>
        <PageButton nowPage={nowPage} className={nowPage<3? 5 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages) : Number(nowPage)+2)} onClick={pagenation}>{nowPage<3? 5 : (Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages) : Number(nowPage)+2)}</PageButton>
        <PageButton onClick={()=>setNowPage(Number(pageInfo.totalPages))}>⇢</PageButton>
      </Pagenation>
      <input
        type="text"
        placeholder="제목을 검색하세요."
        value={searchTerm}
        onChange={e=>setSearchTerm(e.target.value)}
        onKeyUp={loadArticlesList}
      />
    </CommunityContainer>
  );
};
export default CommunityList;
