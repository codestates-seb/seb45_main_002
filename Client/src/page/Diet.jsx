import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, PostDailyMeal } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";
import Button from "../atom/button";
import useZustand from "../zustand/Store";
import FavoriteDailyList from "../component/diet/FavoriteDailyList";
import Modal from "../atom/GlobalModal";
import { postFavoriteDailyMeal } from "../util/FavoriteDaily";

const StyleDiet = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
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
  margin: 20px 5px 40px 5px;
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

const Diet = () => {
  const { date } = useParams();
  const [modalContents, setModalContents] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const { meal, setMeal } = useZustand.useDailyMeals();
  useEffect(() => {
    const asyncfunc = async () => {
      setMeal(await GetDailyDiet(date));
    };
    asyncfunc();
    console.log(meal);
  }, [date]);

  useEffect(() => {
    if (modalContents) {
      setIsModal(true);
    }
  }, [modalContents]);

  const addDailyMealOnClickHandler = async () => {
    setMeal(await PostDailyMeal(date));
  };

  const addFavoriteDailyOnClickHandler = async () => {
    postFavoriteDailyMeal(meal.eachMeals, "name");
  };

  const loadFavoriteDailyOnclickHandler = () => {
    setIsModal(true);
    setModalContents(() => (
      <FavoriteDailyList date={date} setIsModal={setIsModal} />
    ));
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
    <StyleDiet>
      {[1, 2, 3].map((timeslot, index) => (
        <EachMeal key={index} timeslot={timeslot} index={index} />
      ))}
      <DivButton>
        <Button onClick={addFavoriteDailyOnClickHandler}>
          선호식단 저장하기
        </Button>
        <Button primary={true}>자세히 분석하기</Button>
      </DivButton>

      <DivTotal>
        {/* 하루 총 평 */}
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
    </StyleDiet>
  );
};

export default Diet;
