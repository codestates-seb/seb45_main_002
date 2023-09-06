import { useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { styled } from "styled-components";

import Article from "../component/Article";
import SearchForm from "../component/SearchForm";

import useZustand from "../zustand/Store";

import style from "../style/style"

const CommunityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  padding: ${style.layout.wideMargin.height} ${style.layout.wideMargin.width};
`;

const CommunityBody = styled.div`
`;

const ArticleList = styled.div`
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
`;
const WriteBtn = styled.div`
  background-color: #ffc123;
  border: 0.5px solid;
  color: black;
`

const CommunityPage = () => {

  // // 페이지에서 axios 하여 zustand 에 넣기 - 실패
  // const setArticles = useZustand.useArticles(state=>state.setArticles);
  // function loadArticlesList(){
  //   axios.get("https://57b4-59-9-144-107.ngrok-free.app/community?page=1&size=",{
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'ngrok-skip-browser-warning': '69420',
  //       }
  //     })
  //     .then(res=>setArticles({articles: res.data.data}))
  //     .catch(err=>console.log(err+"글 목록 불러오기를 실패했습니다."))
  // }
  // useEffect(()=>{
  //   loadArticlesList()
  // },[])

  // // zustand에서 바로 axios 실행하기 - 성공
  const axiosArticles = useZustand.useArticles(state=>state.axiosArticles);
  useEffect(()=>{
    axiosArticles()
  },[])

  const articles = useZustand.useArticles(state=>state.articles)

  return (
    <CommunityContainer>
      <CommunityBody>
        <ArticleList>
          <BtnContainer>
            <Link to="/community/write"><WriteBtn>글쓰기</WriteBtn></Link>
          </BtnContainer>
          {articles.map((article) => (
            <Article
              article={article}
            />
          ))}
          <SearchForm />
        </ArticleList>
      </CommunityBody>
    </CommunityContainer>
  );
};
export default CommunityPage;
