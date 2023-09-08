import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import useZustand from "../zustand/Store";

const ArticleContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-left: 8px solid #ffc123;
  border-radius: 0 10px 10px 0px;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2);
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ffc1237b;
  cursor: pointer;
`

const InfoContainer = styled.div`
  text-align: right;
  justify-content: right;
`

const Article = ({article}) => {

  const navigate = useNavigate()

  function openArticle(){
    navigate(`/pageswitch/community/detail/${article.communityId}`)
  }

  return (
    <ArticleContainer>
      <TitleContainer onClick={openArticle}>{article.communityTitle}</TitleContainer>
      <InfoContainer>
        좋아요 {article.communitylike} 조회수 {article.communityViewCount}{" "}
        {article.community_createdAt}
      </InfoContainer>
    </ArticleContainer>
  );
};

export default Article;
