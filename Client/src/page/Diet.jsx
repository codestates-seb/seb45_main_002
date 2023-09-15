import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, PostDailyMeal } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";
import Button from "../atom/button";
import useZustand from "../zustand/Store";

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
  margin: calc(100% - 50vh - 90px) 0;
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
  const { meal, setMeal } = useZustand.useDailyMeals();
  useEffect(() => {
    const asyncfunc = async () => {
      setMeal(await GetDailyDiet(date));
    };
    asyncfunc();
  }, [date]);

  const AddDailyMealOnClickHandler = async () => {
    setMeal(await PostDailyMeal(date));
  };

  if (meal === null) {
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
          <Button primary={true} size={"small"}>
            자세히 분석하기
          </Button>
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
