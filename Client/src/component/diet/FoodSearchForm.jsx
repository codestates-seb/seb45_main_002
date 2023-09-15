import { useState, useEffect } from "react";
import { GetFoodKeyword } from "../../util/Diet";
import FoodSearchItem from "./FoodSearchItem";
import { styled } from "styled-components";

const FormDiv = styled.div`
  width: calc(50% - 10px);
  height: max-content;
  background-color: white;
  border-radius: 8px;
  padding: 10px 20px;

  @media (max-width: 800px) {
    width: calc(100% - 10px);
  }

  input {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 2px solid #d9d9d9;
  }
`;

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
    <FormDiv>
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
    </FormDiv>
  );
};

export default FoodSearchForm;
