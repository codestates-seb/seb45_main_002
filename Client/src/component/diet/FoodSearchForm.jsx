import { useState } from "react";
import { GetFoodKeyword, changeEachMeal } from "../../util/Diet";
import { useEffect } from "react";
import Button from "../../atom/button";

const FoodSearchForm = ({ eachMeal, timeslot }) => {
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

  return (
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
              <Button
                size={"square"}
                style={{ width: "20px", height: "20px" }}
                onClick={() => {
                  console.log(item);
                  changeEachMeal(eachMeal, timeslot, item.foodId, 1);
                }}
              >
                +
              </Button>
            </li>
          ))
        ) : (
          <>Err</>
        )}
      </ul>
    </div>
  );
};

export default FoodSearchForm;
