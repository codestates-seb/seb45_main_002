import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import useArticleStore from "../zustand/ArticleStore";

const WriteFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #ffc123;
  border-bottom: 2px solid #ffc123;
`;

const ContentContainer = styled.div`

  & > div {
    background-color: transparent;
    border-top: 2px solid #ffc123;
    border-bottom: 2px solid #ffc123;
  }
`;

const DietContainer = styled.div`
  display: flex;
`;

const DietImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    border: 1px solid BLACK;
    border-radius: 15px;
  }
`;

const DietInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
  }
`;

const FoodInfo = styled.div`
  justify-content: center;
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
  border-radius: 10px;
`;

const SubmitBtn = styled.div`
  display: flex;
  background-color: #ffc123;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

function CommunityDetail({ like, created_at, views, communityContent }){
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
export default CommunityDetail;
