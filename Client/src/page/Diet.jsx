import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "styled-components";
import axios from "axios";

import GetDailyDiet from "../component/diet/GetDailyDiet";
import EachMeal from "../component/diet/EachMeal";

const StyleDiet = styled.div`
  background-color: #d9d9d9;
`;

function Diet() {
  const [meal, setMeal] = useState(GetDailyDiet());
  const SERVER_URL = process.env.SERVER_URL;

  const [inputSearchFood, setInputSearchFood] = useState("");
  const [searchFoodList, setSearchFoodList] = useState([]);

  const searchFoodHandler = () => {
    axios.get(`${SERVER_URL}/search/foods`).then((response) => {
      console.log(response);
      setSearchFoodList(response.data.foods);
    });
  };

  // const AddFoodHandler = (name, kcal) => {
  //   const addMeal = meal;
  //   addMeal.meal.totaldailyKcal += kcal;
  //   addMeal.eachMeal = { ...addMeal.eachMeal }; //미완성
  //   setMeal(addMeal);
  //   axios({
  //     url: `${SERVER_URL}/eachmeals`,
  //     method: "post",
  //     data: meal,
  //   });
  // };

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
              index === 0
                ? "breakfast"
                : index === 1
                ? "lunch"
                : index === 2
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
}

export default Diet;
