import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import GetDailyDiet from "../component/diet/GetDailyDiet";
import EachMeal from "../component/diet/EachMeal";
import GetFoodKeyword from "../component/diet/GetFoodKeyword";
import Button from "../atom/button";

const StyleDiet = styled.div`
  background-color: #d9d9d9;
`;

function Diet() {
  const { date } = useParams();
  const getmeal = GetDailyDiet(date);

  const [meal, setMeal] = useState();

  useEffect(() => {
    setMeal(() => getmeal);
  }, [getmeal, date]);

  const [inputSearchFood, setInputSearchFood] = useState("");
  const [searchFoodList, setSearchFoodList] = useState([]);

  useEffect(() => {
    if (inputSearchFood) {
      const funcasync = async () => {
        const result = await GetFoodKeyword(inputSearchFood);
        await setSearchFoodList(() => result);
      };
      funcasync();
    } else {
      setSearchFoodList(() => []);
    }
  }, [inputSearchFood]);

  if (meal) {
    return (
      <StyleDiet>
        <div className="breakfast"></div>
        <div className="lunch"></div>
        <div className="dinner"></div>
        {Array.isArray(meal) ? (
          meal.eachMeals.map((eachmeal, index) => {
            return (
              <EachMeal
                key={index}
                howeach={
                  eachmeal.timeSlots === 1
                    ? "breakfast"
                    : index === 2
                    ? "lunch"
                    : index === 3
                    ? "dinner"
                    : ""
                }
                eachmeal={eachmeal}
              />
            );
          })
        ) : (
          <>meal data가 없습니다</>
        )}
        <div>
          <input
            placeholder="검색할 음식의 이름을 입력하세요"
            onInput={(e) => setInputSearchFood(e.target.value)}
            value={inputSearchFood}
          />
          <ul>
            {Array.isArray(searchFoodList) ? (
              searchFoodList.map((item, index) => (
                <li key={index}>
                  <p>
                    {item.foodName}: {item.kcal}kcal
                  </p>
                  {/* <button onClick={() => AddFoodHandler(item.foodName, item.kcal)}>
              +
            </button> */}
                </li>
              ))
            ) : (
              <>Err</>
            )}
          </ul>
        </div>
        <div>
          <h3>하루 섭취량</h3>
          <p>칼로리: {meal.totalDailyKcal}</p>
          <p>탄수화물: {meal.totalDailyCarbo}</p>
          <p>단백질: {meal.totalDailyProtein}</p>
          <p>지방: {meal.totalDailyFat}</p>
        </div>
      </StyleDiet>
    );
  } else {
    return <Button>error</Button>;
  }
}

export default Diet;
