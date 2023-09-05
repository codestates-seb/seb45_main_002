import { styled } from "styled-components";
import Article from "../component/Article";
import SearchForm from "../component/SearchForm";
import WriteForm from "../component/WriteForm";
import axios from "axios";
import { useEffect } from "react";
import useArticleStore from "../zustand/ArticleStore";
import ArticleDetail from "../component/ArticleDetail";

const CommunityContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  /* border: 1px solid green; */
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  padding: 15px;
`;

const CommunityBody = styled.div`
  max-width: 768px;
  width: 100vw;
  height: 100vh;
  /* border: 1px solid royalblue; */
`;

const ArticleList = styled.div`
  max-width: 768px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* border: 1px solid crimson; */
  /* padding: 20px; */
`;

const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5%;
  justify-content: right;
  align-items: right;
  padding-top: 20px;
  margin-bottom: 20px;
`;
const WriteBtn = styled.div`
  background-color: #ffc123;
  width: auto;
  height: 20px;
  border: 0.5px solid 
  color: black;

`;
export const CommunityPage = () => {
  const { articles, fetchArticles } = useArticleStore();

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <CommunityContainer>
        <CommunityBody>
          <ArticleList>
            <BtnContainer>
              <WriteBtn>글쓰기</WriteBtn>
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
          <WriteForm></WriteForm>
          <ArticleDetail></ArticleDetail>
        </CommunityBody>
      </CommunityContainer>
    </>
  );
};
