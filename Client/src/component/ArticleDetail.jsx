import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import useArticleStore from "../zustand/ArticleStore";

const WriteFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 100%;
  height: 100vh;
  /* border: 1px solid black; */
  background-color: #efefef;
  padding: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5%;

  padding: 0.5rem;
  margin-bottom: 20px;

  border-top: 2px solid #ffc123;
  border-bottom: 2px solid #ffc123;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 70%;
  /* border: 1px solid red; */
  padding: 0.5rem;

  & > div {
    width: 100%;
    height: 40vh;
    max-height: 70%;
    background-color: transparent;
    border-top: 2px solid #ffc123;
    border-bottom: 2px solid #ffc123;
  }
`;

const DietContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  /* border: 1px solid red; */
`;

const DietImageContainer = styled.div`
  display: flex;
  width: 30%;
  /* border: 1px solid blue; */
  justify-content: center;
  align-items: center;

  & > img {
    width: 90%;
    height: 90%;
    border: 1px solid BLACK;
    border-radius: 15px;
    margin: 0 auto;
  }
`;

const DietInfoContainer = styled.div`
  width: 70%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding-left: 20px;

  & > div {
    display: flex;
    width: 100%;
    height: 30%;
    /* border: 1px solid red; */
  }
`;

const FoodInfo = styled.div`
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  height: 100%;
  /* border: 1px solid red; */
`;

const DietBtnContainer = styled.div`
  display: flex;
`;

const DietBtn = styled.div`
  display: flex;
  background-color: #ffc123;
  color: black;
  justify-content: center;
  align-items: center;
  max-width: 30%;
  width: auto;
  height: 30px;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  font-size: 12px;
`;

const SubmitBtn = styled.div`
  display: flex;
  width: 60px;
  height: 20px;
  background-color: #ffc123;
  border-radius: 10px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const ArticleDetail = ({ like, created_at, views, communityContent }) => {
  const { communityId } = useParams();
  const { articles } = useArticleStore();

  const article = articles.find(
    (article) => article.communityId === parseInt(communityId)
  );

  return (
    <WriteFormContainer>
      <TitleContainer>
        <div>제목입니다</div>
      </TitleContainer>
      <DietContainer>
        <DietImageContainer>
          <img alt="dietimg" />
        </DietImageContainer>
        <DietInfoContainer>
          <div>
            아침
            <FoodInfo>XXX</FoodInfo>
          </div>
          <div>
            점심
            <FoodInfo>YYY</FoodInfo>
          </div>
          <div>
            저녁
            <FoodInfo>ZZZ</FoodInfo>
          </div>
          <div>
            총<FoodInfo>XYZXYZ</FoodInfo>
          </div>
        </DietInfoContainer>
      </DietContainer>
      <ContentContainer>
        <div>{communityContent}</div>
      </ContentContainer>
    </WriteFormContainer>
  );
};

export default ArticleDetail;
