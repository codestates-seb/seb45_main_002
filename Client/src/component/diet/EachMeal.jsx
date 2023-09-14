import { useState } from "react";

import { PostEachMeal } from "../../util/Diet";
import IsEachMeal from "./IsEachMeal";
import NoEachMeal from "./NoEachMeal";
import useZustand from "../../zustand/Store";

const EachMeal = ({ timeslot }) => {
  const { meal, setMeal } = useZustand.useDailyMeals();

  const EachMealAddHandler = async (meal, timeslot) => {
    const result = await PostEachMeal(meal, timeslot);
    await setMeal(null);
    await EachMealAddHandler2(result);
  };

  const EachMealAddHandler2 = (result) => {
    setMeal({ ...result });
  };

  // 1: 아침, 2: 점심, 3: 저녁

  for (let eachMeal of meal.eachMeals) {
    if (eachMeal.timeSlots === timeslot) {
      // dailyMeal에 해당하는 timeslot의 eachMeal이 등록되어있는 경우
      return <IsEachMeal timeslot={timeslot} />;
    }
  }

  // dailyMeal에 해당하는 timeslot의 eachMeal이 등록되어있지 않는 경우
  return (
    <NoEachMeal timeslot={timeslot} EachMealAddHandler={EachMealAddHandler} />
  );
};

export default EachMeal;
