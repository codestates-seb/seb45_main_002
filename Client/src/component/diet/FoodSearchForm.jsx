import { useState } from "react";
import { GetFoodKeyword } from "../../util/Diet";
import { useEffect } from "react";
import FoodSearchItem from "./FoodSearchItem";

const FoodSearchForm = ({ timeslot }) => {
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
            <FoodSearchItem item={item} key={index} timeslot={timeslot} />
          ))
        ) : (
          <>Error</>
        )}
      </ul>
    </div>
  );
};

export default FoodSearchForm;
