import { styled } from "styled-components";
import useArticleStore from "../zustand/ArticleStore";

const ArticleContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10%;
  border-left: 8px solid #ffc123;
  border-radius: 0 10px 10px 0px;
  padding: 7px;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2);
`;

// const ProfileContainer = styled.div`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   border: 1px solid red;
// `;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 80%;
  border-bottom: 1px solid #ffc123;
  font-size: 18px;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  height: auto;
  display: inline;
  text-align: right;
  justify-content: right;
  font-size: 12px;
`;

const Article = ({ articleId }) => {
  const { articles } = useArticleStore();

  const article = articles.find((article) => article.communityId === articleId);

  if (!article) {
    return alert("article error");
  }

  return (
    <ArticleContainer>
      <TitleContainer>{article.communityTitle}</TitleContainer>
      <InfoContainer>
        좋아요 {article.communitylike} 조회수 {article.communityViewCount}{" "}
        {article.community_createdAt}
      </InfoContainer>
    </ArticleContainer>
  );
};

export default Article;
