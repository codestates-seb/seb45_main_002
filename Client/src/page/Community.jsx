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

  const articles = useZustand.useArticle(state=>state.articles)

  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  return (
    <CommunityContainer>
      <CommunityBody>
        <ArticleList>
          <BtnContainer>
            <Link to="/community/write" ><WriteBtn>글쓰기</WriteBtn></Link>
          </BtnContainer>
          {articles.map((article) => (
            <Article
              key={article.communityId}
              title={article.communityTitle}
              likes={article.communityLike}
              views={article.communityViewCount}
              createdAt={article.community_createdAt}
              articleId={article.communityId}
            />
          ))}
          <SearchForm />
        </ArticleList>
      </CommunityBody>
    </CommunityContainer>
  );
};
export default CommunityPage;
