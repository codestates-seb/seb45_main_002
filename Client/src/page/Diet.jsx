import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, GetFoodKeyword, PostDailyMeal } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";
import Button from "../atom/button";
import useZustand from "../zustand/Store";

const StyleDiet = styled.div``;

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
      <div>
        <Button onClick={AddDailyMealOnClickHandler}>커스텀 식단 만들기</Button>
        <Button>저장해둔 식단 불러오기</Button>
      </div>
    );
  }

  return (
    <StyleDiet>
      {[1, 2, 3].map((timeslot, index) => (
        <EachMeal key={index} timeslot={timeslot} index={index} />
      ))}

      <div>
        {/* 하루 총 평 */}
        <h3>하루 섭취량</h3>
        <p>칼로리: {meal?.totalDailyKcal ?? ""}kcal</p>
        <p>탄수화물: {meal?.totalDailyCarbo ?? ""}g</p>
        <p>단백질: {meal?.totalDailyProtein ?? ""}g</p>
        <p>지방: {meal?.totalDailyFat ?? ""}g</p>
      </div>
    </StyleDiet>
  );
};

export default Diet;
