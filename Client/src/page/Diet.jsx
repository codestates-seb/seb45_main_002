import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, PostDailyMeal } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";
import Button from "../atom/button";
import useZustand from "../zustand/Store";
import AnalyzedDiet from "../component/diet/DietAnalyze";
import { useState } from "react";
import Modal from "../atom/GlobalModal";

const StyleDiet = styled.div`
  width: 100%;
`;

const DivTotal = styled.div`
  width: calc(100%-10px);
  margin: 10px 5px 0 5px;
  padding: 10px 20px;
  height: 180px;
  background-color: white;
  border-radius: 8px;
  font-size: 14px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h3 {
    font-size: 18px;
    margin-right: 10px;
  }

  & > div {
    width: 100%;
    display: flex;
    align-items: center;

    p {
      width: 50%;
    }
  }
`;

const StyleNewDiet = styled.div`
  width: 100%;
  margin: calc(50vh - 120px) 0;
  display: flex;
  justify-content: center;
  h3 {
    font-size: 16px;
  }
  div {
    width: 240px;
    height: 180px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 70vw;
  height: 70vh;
  border: 1px solid orange;
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  justify-content: center;
  align-items: space-between;
  gap: 10px;
`;

const ItemContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10%;
  max-height: 20vh;
  border: 1px solid green;
`;

const CustomSpan = styled.span`
  color: black;
`;

const Diet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);
  const [analyzedData, setAnalyzedData] = useState(null);
  const { date } = useParams();
  const { meal, setMeal } = useZustand.useDailyMeals();
  console.log(meal);
  useEffect(() => {
    const asyncfunc = async () => {
      setMeal(await GetDailyDiet(date));
    };
    asyncfunc();
  }, [date]);

  const AddDailyMealOnClickHandler = async () => {
    setMeal(await PostDailyMeal(date));
  };

  const handleAnalyzeDiet = async (dailymealId, analysisId) => {
    try {
      console.log(meal);
      dailymealId = meal.dailyMealId;
      const analyzedData = await AnalyzedDiet(dailymealId);
      setAnalyzedData();
      setIsModalOpen(true);
      setModalHeader("");
      setModalFooter(" footer입니다");
      setModalContent(
        <div>
          <Container>
            <FlexContainer>
              <h2>Daily Meal</h2>
              <ItemContainer>
                <p>Daily Meal ID: {analyzedData.dailyMeal.dailyMealId}</p>
                <p>Date: {analyzedData.dailyMeal.date}</p>
                <p>Name: {analyzedData.dailyMeal.name}</p>
              </ItemContainer>
              <ItemContainer>
                <p>총 칼로리 : {analyzedData.dailyMeal.totalDailyKcal}</p>
                <p>부족 칼로리 : {analyzedData.dailyMeal.totalDailyKcal}</p>
                <p>초과 칼로리 : {analyzedData.dailyMeal.totalDailyKcal}</p>
              </ItemContainer>
              <ItemContainer>
                <p>총 탄수화물 : {analyzedData.dailyMeal.totalDailyCarbo}</p>
                {analyzedData.idealMacro.idealCarbohydrates > 0 && (
                  <p style={{ color: "orange" }}>
                    초과 탄수화물: {analyzedData.idealMacro.idealCarbohydrates}
                  </p>
                )}
                {/* {analyzedData.overMacro.overCarbohydrates > 0 && (
                  <p style={{ color: "red" }}>
                     지방: {analyzedData.overMacro.overFats}
                  </p>
                )} */}
              </ItemContainer>
              <ItemContainer>
                <p>총 단백질: {analyzedData.dailyMeal.totalDailyProtein}</p>
                {analyzedData.idealMacro.idealProteins > 0 && (
                  <p style={{ color: "red" }}>
                    초과 단백질: {analyzedData.idealMacro.idealProteins}g
                  </p>
                )}
                {/* {analyzedData.overMacro.overProteins > 0 && (
                  <p style={{ color: "red" }}>
                    초과 단백질: {analyzedData.overMacro.overProteins}
                  </p>
                )} */}
              </ItemContainer>
              <ItemContainer>
                <p>총 지방: {analyzedData.dailyMeal.totalDailyFat}</p>
                {analyzedData.idealMacro.idealFats > 0 && (
                  <p style={{ color: "red" }}>
                    초과 지방: {analyzedData.idealMacro.idealFats}g
                  </p>
                )}
                {/* {analyzedData.overMacro.overFats > 0 && (
                  <p style={{ color: "red" }}>
                    지방: {analyzedData.overMacro.overFats}g
                  </p>
                )} */}
              </ItemContainer>

              <ItemContainer>
                <div>결과</div>
                <div> {analyzedData.result}</div>
              </ItemContainer>
              <ItemContainer></ItemContainer>
            </FlexContainer>
          </Container>
        </div>
      );
    } catch (error) {
      console.error("Error analyzing diet", error);
    }
  };

  if (meal === null) {
    return <div>로그인 후 이용해주세요</div>;
  }

  if (meal === "DailyMeal not found...") {
    return (
      <StyleNewDiet>
        <div>
          <h3>저장된 식단이 아직 없습니다.</h3>
          <Button primary={true} onClick={AddDailyMealOnClickHandler}>
            커스텀 식단 만들기
          </Button>
          <Button>저장해둔 식단 불러오기</Button>
        </div>
      </StyleNewDiet>
    );
  }

  return (
    <StyleDiet>
      {[1, 2, 3].map((timeslot, index) => (
        <EachMeal key={index} timeslot={timeslot} index={index} />
      ))}

      <DivTotal>
        {/* 하루 총 평 */}
        <div>
          <h3>하루 섭취량</h3>
          <Button dailymealId={meal?.dailyMealId} onClick={handleAnalyzeDiet}>
            자세히 분석하기{" "}
          </Button>
          <Modal
            isOpen={isModalOpen}
            content={modalContent}
            header={modalHeader}
            footer={modalFooter}
            setIsOpen={setIsModalOpen}
            setContent={setModalContent}
            setHeader={setModalHeader}
            setFooter={setModalFooter}
          />
        </div>
        <div>
          <p>칼로리: {meal?.totalDailyKcal ?? ""}kcal</p>
          <p>탄수화물: {meal?.totalDailyCarbo ?? ""}g</p>
        </div>
        <div>
          <p>단백질: {meal?.totalDailyProtein ?? ""}g</p>
          <p>지방: {meal?.totalDailyFat ?? ""}g</p>
        </div>
      </DivTotal>
    </StyleDiet>
  );
};

export default Diet;
