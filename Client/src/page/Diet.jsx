import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, PostDailyMeal } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";
import Button from "../atom/button";
import useZustand from "../zustand/Store";
import FavoriteDailyList from "../component/diet/FavoriteDailyList";
import Modal from "../atom/GlobalModal";
import InputAddFavorite from "../component/diet/InputAddFavorite";
import DeleteModal from "../component/diet/DeleteModal";
import AnalyzedDiet from "../component/diet/DietAnalyze";

const StyleDiet = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;

  & > p {
    font-size: 14px;
    color: #898989;
    text-align: right;
    margin-right: 10px;
    margin-bottom: 40px;
    cursor: pointer;

    &:active,
    &:hover,
    &:focus {
      color: red;
    }
  }
`;

const DivButton = styled.div`
  width: calc(50% - 10px);
  margin: 10px 5px 0 5px;
  display: flex;
  gap: 10px;
  button {
    width: calc(50% - 5px);
  }

  @media (max-width: 800px) {
    width: calc(100% - 10px);
  }
`;

const DivTotal = styled.div`
  width: calc(100%-10px);
  margin: 10px 5px 5px 5px;
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
  margin: calc(50vh - 120px) 0 0 0;
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
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25%;
  max-height: 20vh;
  border: 1px solid green;

  & > div {
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
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
  const [modalContents, setModalContents] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const { meal, setMeal } = useZustand.useDailyMeals();
  console.log(meal);
  useEffect(() => {
    const asyncfunc = async () => {
      setMeal(await GetDailyDiet(date));
    };
    asyncfunc();
  }, [date]);

  useEffect(() => {
    if (modalContents) {
      setIsModal(true);
    }
  }, [modalContents]);

  const addDailyMealOnClickHandler = async () => {
    setMeal(await PostDailyMeal(date));
  };

  const deleteDailyOnClickHandler = () => {
    setIsModal(true);
    setModalContents(() => (
      <DeleteModal dailyMealId={meal.dailyMealId} setIsModal={setIsModal} />
    ));
  };

  const addFavoriteDailyOnClickHandler = () => {
    setIsModal(true);
    setModalContents(() => (
      <InputAddFavorite meal={meal} setIsModal={setIsModal} />
    ));
  };

  const loadFavoriteDailyOnclickHandler = () => {
    setIsModal(true);
    setModalContents(() => (
      <FavoriteDailyList date={date} setIsModal={setIsModal} />
    ));
  };

  const handleAnalyzeDiet = async (dailymealId, analysisId) => {
    try {
      console.log(meal);
      dailymealId = meal.dailyMealId;
      const analyzedData = await AnalyzedDiet(dailymealId);
      setAnalyzedData();
      setIsModalOpen(true);
      setModalHeader("분석 결과");
      setModalFooter(" footer입니다");
      setModalContent(
        <div>
          <Container>
            <FlexContainer>
              <ItemContainer>
                <div>
                  총 섭취 칼로리 : {analyzedData.dailyMeal.totalDailyKcal}
                </div>
                <div>권장하는 칼로리 : {analyzedData.idealKacl}</div>
                <div>초과된 칼로리 : {analyzedData.overKcal}</div>
              </ItemContainer>
              <ItemContainer>
                <div>
                  총 섭취 탄수화물: {analyzedData.dailyMeal.totalDailyCarbo}
                </div>
                <div>
                  권장하는 탄수화물:{" "}
                  {analyzedData.idealMacro.idealCarbohydrates}
                </div>
                {analyzedData.idealMacro.idealCarbohydrates * 0.1 <
                  Math.abs(analyzedData.overMacro.overCarbohydrates) && (
                  <div
                    style={{
                      color:
                        analyzedData.overMacro.overCarbohydrates < 0
                          ? "orange"
                          : "red",
                    }}
                  >
                    {analyzedData.overMacro.overCarbohydrates < 0
                      ? `부족한 탄수화물: ${Math.abs(
                          analyzedData.overMacro.overCarbohydrates
                        )}`
                      : `초과 탄수화물: ${analyzedData.overMacro.overCarbohydrates}`}
                  </div>
                )}
                {analyzedData.idealMacro.idealCarbohydrates * 0.1 >=
                  Math.abs(analyzedData.overMacro.overCarbohydrates) && (
                  <div style={{ color: "blue" }}>적절해요 !</div>
                )}
              </ItemContainer>
              <ItemContainer>
                <div>
                  총 섭취 단백질: {analyzedData.dailyMeal.totalDailyProtein}
                </div>
                <div>
                  권장하는 단백질: {analyzedData.idealMacro.idealProteins}
                </div>
                {analyzedData.idealMacro.idealProteins * 0.1 <
                  Math.abs(analyzedData.overMacro.overProteins) && (
                  <div
                    style={{
                      color:
                        analyzedData.overMacro.overProteins < 0
                          ? "red"
                          : "orange",
                    }}
                  >
                    {analyzedData.overMacro.overProteins < 0
                      ? `부족한 단백질: ${Math.abs(
                          analyzedData.overMacro.overProteins
                        )}`
                      : `초과 단백질: ${analyzedData.overMacro.overProteins}`}
                  </div>
                )}
                {analyzedData.idealMacro.idealProteins * 0.1 >=
                  Math.abs(analyzedData.overMacro.overProteins) && (
                  <div style={{ color: "blue" }}>적절해요 !</div>
                )}
              </ItemContainer>
              <ItemContainer>
                <div>총 섭취 지방: {analyzedData.dailyMeal.totalDailyFat}</div>
                <div>권장하는 지방: {analyzedData.idealMacro.idealFats}</div>
                {analyzedData.idealMacro.idealFats * 0.1 <
                  Math.abs(analyzedData.overMacro.overFats) && (
                  <div
                    style={{
                      color:
                        analyzedData.overMacro.overFats < 0 ? "orange" : "red",
                    }}
                  >
                    {analyzedData.overMacro.overFats < 0
                      ? `부족한 지방: ${Math.abs(
                          analyzedData.overMacro.overFats
                        )}`
                      : `초과 지방: ${analyzedData.overMacro.overFats}`}
                  </div>
                )}
                {analyzedData.idealMacro.idealFats * 0.1 >=
                  Math.abs(analyzedData.overMacro.overFats) && (
                  <div style={{ color: "blue" }}>적절해요 !</div>
                )}
              </ItemContainer>

              <ItemContainer>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>결과</div>
                <div>
                  {analyzedData.result.split("\n").map((line, index) => (
                    <div key={index}>
                      {line}
                      <br />
                    </div>
                  ))}
                </div>
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
    // 해당 날짜 저장된 식단이 없는 경우
    return (
      <>
        {isModal ? (
          <Modal
            style={{ maxWidth: "680px", width: "90vw", maxHeight: "80vh" }}
            isOpen={isModal}
            content={modalContents}
            setIsOpen={setIsModal}
            setContent={setModalContents}
            setHeader={() => {}}
            setFooter={() => {}}
          />
        ) : null}
        <StyleNewDiet>
          <div>
            <h3>저장된 식단이 아직 없습니다.</h3>
            <Button primary={true} onClick={addDailyMealOnClickHandler}>
              커스텀 식단 만들기
            </Button>
            <Button onClick={loadFavoriteDailyOnclickHandler}>
              저장해둔 식단 불러오기
            </Button>
          </div>
        </StyleNewDiet>
      </>
    );
  }

  return (
    // 식단 출력
    <>
      {isModal ? (
        <Modal
          style={{ width: "240px", height: "180px" }}
          isOpen={isModal}
          content={modalContents}
          setIsOpen={setIsModal}
          setContent={setModalContents}
          setHeader={() => {}}
          setFooter={() => {}}
        />
      ) : null}
      <StyleDiet>
        {[1, 2, 3].map((timeslot, index) => (
          <EachMeal key={index} timeslot={timeslot} index={index} />
        ))}
        <DivButton>
          <Button onClick={addFavoriteDailyOnClickHandler}>
            선호식단 저장하기
          </Button>
          <Button dailymealId={meal?.dailyMealId} onClick={handleAnalyzeDiet}>
            자세히 분석하기{" "}
          </Button>
        </DivButton>

        <DivTotal>
          {/* 하루 총 평 */}

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
          <div>
            <h3>하루 섭취량</h3>
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
        <p onClick={deleteDailyOnClickHandler}>식단 삭제하기</p>
      </StyleDiet>
    </>
  );
};

export default Diet;
