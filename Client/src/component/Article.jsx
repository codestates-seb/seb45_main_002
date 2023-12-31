import { Link } from "react-router-dom";

import { styled } from "styled-components";

import style from "../style/style";

const ArticleContainer = styled.ul`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-left: 8px solid #ffc123;
  border-radius: 0 10px 10px 0px;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2);
  list-style: none;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  width: ${style.layout.main.width-style.layout.wideMargin.width*2};
`

const ArticleBox = styled.li`
  &>a{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 1px solid rgba(255, 193, 35, 0.5);
    padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    font-weight: bold;
  }
`

const InfoContainer = styled.div`
  text-align: right;
  justify-content: right;
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
`

const LikeViewCreate = styled.span`
  border-radius: 5px;
  border-left: solid 3px orange;
  padding-left: 5px;
  margin-right: ${style.layout.narrowMargin.width};
  font-size: small;
`

const Article = ({article}) => {

  const date = new Date(article.community_createdAt)

  return (
    <ArticleContainer>
      <ArticleBox>
        <Link to={"/pageswitch/community/detail/"+article.communityId}>{article.communityTitle}</Link>
        <InfoContainer>
          <LikeViewCreate>
            {date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 
          </LikeViewCreate>
          <LikeViewCreate>
            좋아요 {article.recommendationCount}
          </LikeViewCreate>
          <LikeViewCreate>
            댓글 {article.communityCommentCount}
          </LikeViewCreate>
          <LikeViewCreate>
            조회수 {article.communityViewCount}
          </LikeViewCreate>
        </InfoContainer>
      </ArticleBox>
    </ArticleContainer>
  );
};

export default Article;
