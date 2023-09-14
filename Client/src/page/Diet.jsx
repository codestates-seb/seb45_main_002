import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, GetFoodKeyword } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";

const StyleDiet = styled.div``;

const dummyMeal = {
  eachMeals: [
    {
      memberId: 1,
      dailymealId: 12,
      timeSlots: 1,
      foods: [
        {
          foodId: 5,
          brand: "전국(대표)",
          foodName: "더덕구이",
          foodCategory1: "구이류",
          foodCategory2: "채소류구이",
          servingSize: 100,
          quantity: 1.0,
          ratioEachKcal: 184.0,
          ratioEachCarbo: 31.0,
          ratioEachProtein: 3.0,
          ratioEachFat: 5.0,
        },
      ],
      totalEachKcal: 1000,
      totalEachCarbo: 50,
      totalEachProtein: 50,
      totalEachFat: 50,
    },
    {
      memberId: 1,
      dailymealId: 13,
      timeSlots: 2,
      foods: [
        {
          foodId: 5,
          brand: "전국(대표)",
          foodName: "더덕구이",
          foodCategory1: "구이류",
          foodCategory2: "채소류구이",
          servingSize: 100,
          quantity: 1.7,
          ratioEachKcal: 184.0,
          ratioEachCarbo: 31.0,
          ratioEachProtein: 3.0,
          ratioEachFat: 5.0,
        },
      ],
      totalEachKcal: 1000,
      totalEachCarbo: 50,
      totalEachProtein: 50,
      totalEachFat: 50,
    },
    {
      memberId: 1,
      dailymealId: 14,
      timeSlots: 3,
      foods: [],
      totalEachKcal: 1000,
      totalEachCarbo: 50,
      totalEachProtein: 50,
      totalEachFat: 50,
    },
  ],
};

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
        {/* Food 검색 폼 */}
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
