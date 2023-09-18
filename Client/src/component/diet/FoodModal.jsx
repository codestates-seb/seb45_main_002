import { useEffect, useState } from "react";
import { getFoodDetail } from "../../util/Diet";
import Button from "../../atom/button";
import { styled } from "styled-components";

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 240px;
  width: 90vw;
  gap: 10px;

  & > div {
    display: flex;
    width: 100%;
    min-width: max-content;
    text-align: left;

    & > div {
      display: flex;
      flex-direction: column;
      width: 33%;
      min-width: max-content;
    }
  }
`;

const FoodModal = ({ foodId, setIsModal }) => {
  const [food, setFood] = useState(null);
  useEffect(() => {
    const asyncfunc = async () => {
      setFood(await getFoodDetail(foodId));
    };
    asyncfunc();
  }, [foodId]);

  if (food === null) {
    return <>로딩중</>;
  }

  return (
    <DivStyle>
      <h2>{food.foodName}</h2>
      <p>
        카테고리: {food.foodCategory1}/{food.foodCategory2}
      </p>
      <div className="defaultNutrition">
        <div>
          <div>칼로리: {food.kcal}</div>
          <div>단백질: {food.protein}</div>
        </div>
        <div>
          <div>탄수화물: {food.carbo}</div>
          <div>지방: {food.fat}</div>
        </div>
      </div>
      <div>
        <div>
          <p>나트륨: {food.etcNutrients.natrium}</p>
          <p>콜레스테롤: {food.etcNutrients.cholesterol}</p>
          <p>식이섬유: {food.etcNutrients.dietaryFiber}</p>
          <p>포화지방: {food.etcNutrients.saturatedFat}</p>
          <p>당류: {food.etcNutrients.sugar}</p>
        </div>
        <div>
          <p>칼슘: {food.etcNutrients.calcium}</p>
          <p>엽산: {food.etcNutrients.folicAcid}</p>
          <p>철: {food.etcNutrients.iron}</p>
          <p>칼륨: {food.etcNutrients.potassium}</p>
        </div>
        <div>
          <p>비타민A: {food.etcNutrients.vitaminA}</p>
          <p>비타민B1: {food.etcNutrients.vitaminB1}</p>
          <p>비타민B2: {food.etcNutrients.vitaminB2}</p>
          <p>비타민B3: {food.etcNutrients.vitaminB3}</p>
          <p>비타민B12: {food.etcNutrients.vitaminB12}</p>
          <p>비타민C: {food.etcNutrients.vitaminC}</p>
          <p>비타민D: {food.etcNutrients.vitaminD}</p>
          <p>비타민E: {food.etcNutrients.vitaminE}</p>
        </div>
      </div>
      <Button
        size={"small"}
        onClick={() => {
          setIsModal(false);
        }}
      >
        닫기
      </Button>
    </DivStyle>
  );
};

export default FoodModal;
