import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, GetFoodKeyword } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";

const StyleDiet = styled.div``;

function Diet() {
  const { date } = useParams();
  const getmeal = GetDailyDiet(date);

  const [meal, setMeal] = useState();

  useEffect(() => {
    setMeal(() => getmeal);
  }, [getmeal, date]);

  if (!meal) {
    return <div>error</div>;
  }

  return (
    <StyleDiet>
      {[1, 2, 3].map((timeslot, index) => (
        <EachMeal
          key={index}
          meal={meal}
          timeslot={timeslot}
          index={index}
          setMeal={setMeal}
        />
      ))}

      <div>
        {/* 하루 총 평 */}
        <h3>하루 섭취량</h3>
        <p>칼로리: {meal?.totalDailyKcal ?? ""}</p>
        <p>탄수화물: {meal?.totalDailyCarbo ?? ""}</p>
        <p>단백질: {meal?.totalDailyProtein ?? ""}</p>
        <p>지방: {meal?.totalDailyFat ?? ""}</p>
      </div>
    </StyleDiet>
  );
}

export default Diet;
