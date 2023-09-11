import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import useArticleStore from "../zustand/ArticleStore";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";

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
  max-height: 70%;
  /* border: 1px solid red; */
  padding: 10px;
  text-align: right;

  & > div {
    text-align: left;
    margin-top: 1rem;
    padding-top: 1rem;
    width: 100%;
    height: 40vh;
    max-height: 90%;
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

const BtnContainer = styled.div`
  padding: 10px;
  align-items: center;
  justify-content: flex-end;
  display: flex;

  width: 100%;
  height: 3em;
  /* border: 1px solid red; */
  gap: 10px;
`;

const CommonBtn = styled.div`
  display: flex;
  width: 60px;
  height: 20px;
  background-color: #ffc123;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const HeartIcon = styled.div`
  position: relative;
  cursor: pointer;
  width: 18px;
  height: 18px;
`;

const HeartOutline = styled(HeartOutlined)`
  font-size: 18px;
  color: ${(props) => (props.isChecked ? "black" : "red")};
`;

const HeartFill = styled(HeartFilled)`
  font-size: 18px;
  color: red;
`;

const LikeBtn = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <HeartIcon onClick={onClick}>
      {isChecked ? (
        <HeartFill isChecked={isChecked} />
      ) : (
        <HeartOutline isChecked={isChecked} />
      )}
    </HeartIcon>
  );
};

const ArticleDetail = ({
  like,
  CommunityCreatedAt,
  views,
  communityContent,
  communityTitle,
}) => {
  const { communityId } = useParams();
  const { articles } = useArticleStore();

  const article = articles.find(
    (article) => article.communityId === parseInt(communityId)
  );

  return (
    <WriteFormContainer>
      <TitleContainer>
        <div> {communityTitle}제목입니다</div>
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
        n년n월n일 {CommunityCreatedAt}
        <div>
          콘텐츠입니다
          {communityContent}
        </div>
      </ContentContainer>
      <BtnContainer>
        <CommonBtn />
        <LikeBtn />
      </BtnContainer>
    </WriteFormContainer>
  );
};

export default ArticleDetail;
