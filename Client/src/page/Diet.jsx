import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "styled-components";
import axios from "axios";

import GetDailyDiet from "../component/diet/GetDailyDiet";
import EachMeal from "../component/diet/EachMeal";
import PostNewDailyDiet from "../component/diet/PostNewDailyDiet";

const StyleDiet = styled.div`
  background-color: #d9d9d9;
`;

function Diet() {
  const { date } = useParams();
  const [meal, setMeal] = useState(GetDailyDiet(date));

  const [inputSearchFood, setInputSearchFood] = useState("");
  const [searchFoodList, setSearchFoodList] = useState([]);

  const searchFoodHandler = (value) => {
    axios
      .get(`http://43.201.194.176:8080/search/foods?search-word=${value}`)
      .then((response) => {
        console.log(response);
        setSearchFoodList(response.data.foods);
      });
  };

  if (meal) {
    return (
      <StyleDiet>
        <div className="breakfast"></div>
        <div className="lunch"></div>
        <div className="dinner"></div>
        {meal.eachMeals.map((eachmeal, index) => {
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
        })}
        <div>
          <input
            placeholder="검색할 음식의 이름을 입력하세요"
            onInput={searchFoodHandler}
            value={inputSearchFood}
            onChange={(e) => {
              setInputSearchFood(e.target.value);
            }}
          />
          {searchFoodList.map((item) => (
            <ul>
              <li>
                <p>{item.foodName}</p>
                <p>{item.kcal}</p>
                {/* <button onClick={() => AddFoodHandler(item.foodName, item.kcal)}>
              +
            </button> */}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <p>칼로리: {meal.totalDailyKcal}</p>
          <p>탄수화물: {meal.totalDailyCarbo}</p>
          <p>단백질: {meal.totalDailyProtein}</p>
          <p>지방: {meal.totalDailyFat}</p>
        </div>
      </StyleDiet>
    );
  } else {
    return <PostNewDailyDiet dateStr={date} setMeal={setMeal} />;
  }
}

export default Diet;
