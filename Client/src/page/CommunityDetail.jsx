import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

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

function CommunityDetail(){
  const [detail, setDetail] = useState({})

  const communityId = useParams();

  function loadDetail(){
    axios.get("http://43.201.194.176:8080/community/"+communityId["*"])
    .then(res=>setDetail(res.data))
    .catch(err=>console.log(err))
  }
  useEffect(()=>loadDetail(),[])
  console.log(detail)
  return (
    <WriteFormContainer>
      <TitleContainer>
        <div>{detail.communityTitle}</div>
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
        <div>{detail.communityContent}</div>
      </ContentContainer>
    </WriteFormContainer>
  );
};
export default CommunityDetail;
