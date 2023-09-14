import { useState } from "react";

import { PostEachMeal } from "../../util/Diet";
import IsEachMeal from "./IsEachMeal";
import NoEachMeal from "./NoEachMeal";

const EachMeal = ({ meal, timeslot, setMeal }) => {
  const [isSearchForm, setIsSearchForm] = useState(0);

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
      return (
        <IsEachMeal
          eachMeal={eachMeal}
          timeslot={timeslot}
          isSearchForm={isSearchForm}
          setIsSearchForm={setIsSearchForm}
        />
      );
    }
  }

  // dailyMeal에 해당하는 timeslot의 eachMeal이 등록되어있지 않는 경우
  return (
    <NoEachMeal
      meal={meal}
      timeslot={timeslot}
      EachMealAddHandler={EachMealAddHandler}
    />
  );
};

export default EachMeal;
