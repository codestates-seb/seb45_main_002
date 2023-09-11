import { styled } from "styled-components";
import GetFood from "./GetFood";

const DivEachMeal = styled.div`
  background-color: #ffffaa;
`;

const EachMeal = (howeach, eachmeal) => {
  return (
    <DivEachMeal className={howeach}>
      {eachmeal.eachMealFood.map((eachmealfood) => {
        const food = GetFood(eachmealfood.foodId);
        return (
          <div>
            <p>{food.foodName}</p>
            <p>{eachmealfood.quentity}</p>
          </div>
        );
      })}
      <h3>총 영양소</h3>
      <p>칼로리: {eachmeal.totalEachKcal}</p>
      <p>탄수화물: {eachmeal.totalEachCarbo}</p>
      <p>단백질: {eachmeal.totalEachProtein}</p>
      <p>지방: {eachmeal.totalEachFat}</p>
    </DivEachMeal>
  );
};

export default EachMeal;
