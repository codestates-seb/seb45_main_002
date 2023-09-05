import { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";

const StyleDiet = styled.div`
  background-color: #d9d9d9;
`;

function Diet() {
  const [meal, setMeal] = useState({});
  const [inputSearchFood, setInputSearchFood] = useState("");
  const [searchFoodList, setSearchFoodList] = useState([]);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
  axios
  .get(`${SERVER_URL}/dailymeals/{dailymealid}`)
  .then((response) => {
      // 성공한 경우 실행
      console.log(response);
      setMeal(response.data);
   })
   .catch((error) => {
      // 에러인 경우 실행
      console.log(error);
   });
}, []);

  const searchFoodHandler = () => {
  axios.get(`${SERVER_URL}/search/foods`).then((response) => {
    console.log(response);
    setSearchFoodList(response.data.foods);
  });
  };

  const AddFoodHandler = (name, kcal) => {
    const addMeal = meal;
    addMeal.meal.totaldailyKcal += kcal;
    addMeal.eachMeal = { ...addMeal.eachMeal }; //미완성
    setMeal(addMeal);
    axios({
      url: `${SERVER_URL}/eachmeals`,
      method: "post",
      data: meal,
    });
  };

  return (
    <StyleDiet>
      <div>
        <input
          placeholder="검색할 음식의 이름을 입력하세요"
          onInput={searchFoodHandler}
        />
        {searchFoodList.map((item) => (
          <ul>
            <li>
              <p>{item.foodName}</p>
              <p>{item.kcal}</p>
              <button onClick={() => AddFoodHandler(item.foodName, item.kcal)}>
                +
              </button>
            </li>
          </ul>
        ))}
      </div>
    </StyleDiet>
  );
}

export default Diet;
