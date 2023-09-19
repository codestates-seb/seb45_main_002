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
  ${props=>props.hide==="hide"? "display: none;" : ""}
`

const CommunityList = () => {

  const [nowPage, setNowPage] = useState(1)
  const [pageInfo, setPageInfo] = useState({})
  const [articles, setArticles] = useState([])
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

  return (
    <CommunityContainer>
      <BtnContainer>
        <Link
          to={
            localStorage.getItem("Authorization")?
            "/pageswitch/community/write" : "/pageswitch/community"
          }
          onClick={e=>localStorage.getItem("Authorization")? null : alert("로그인 후 이용해주시기 바랍니다.")}
        >
          <WriteBtn>글쓰기</WriteBtn>
        </Link>
      </BtnContainer>
      {articles.map(article => (
        <Article
          article={article}
        />
      ))}
      <Pagenation>
        <PageButton onClick={()=>setNowPage(1)}>⇠</PageButton> {/*(Number(pageInfo.totalPages)-2<nowPage? Number(pageInfo.totalPages)-4 : Number(nowPage)-2)*/}
        <PageButton className={pageInfo.totalPages<6? 1 : (pageInfo.totalPages-nowPage<2? null : nowPage-2)} onClick={e=>setNowPage(e.target.innerText)} nowPage={nowPage}>{nowPage-2<1? 1 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-Number(nowPage)+1 : nowPage-2)}</PageButton>
        <PageButton className={nowPage-2<1? 2 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-4 : nowPage-2)} onClick={e=>setNowPage(e.target.innerText)} nowPage={nowPage} hide={pageInfo.totalPages<2? "hide" : ""}>{nowPage-2<1? 2 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-Number(nowPage)+2 : nowPage-2)}</PageButton>
        <PageButton className={nowPage-2<1? 3 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-4 : nowPage-2)} onClick={e=>setNowPage(e.target.innerText)} nowPage={nowPage} hide={pageInfo.totalPages<3? "hide" : ""}>{nowPage-2<1? 3 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-Number(nowPage)+3 : nowPage-2)}</PageButton>
        <PageButton className={nowPage-2<1? 4 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-4 : nowPage-2)} onClick={e=>setNowPage(e.target.innerText)} nowPage={nowPage} hide={pageInfo.totalPages<4? "hide" : ""}>{nowPage-2<1? 4 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-1 : nowPage-2)}</PageButton>
        <PageButton className={nowPage-2<1? 5 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages-4 : nowPage-2)} onClick={e=>setNowPage(e.target.innerText)} nowPage={nowPage} hide={pageInfo.totalPages<5? "hide" : ""}>{nowPage-2<1? 5 : (pageInfo.totalPages-nowPage<2? pageInfo.totalPages : nowPage-2)}</PageButton>
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
