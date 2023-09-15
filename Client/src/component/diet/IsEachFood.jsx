import { useState } from "react";
import Button from "../../atom/button";
import { styled } from "styled-components";
import useZustand from "../../zustand/Store";
import { changeEachMeal } from "../../util/Diet";

const StyleFood = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 2px solid #ffc123;
  border-top: 0;
  padding: 10px;
  font-size: 14px;

  & input {
    width: 40px;
  }

  & > p:first-child {
    width: calc(100% - 20px - 80px);
    font-weight: 600;
  }
`;

const IsEachFood = ({ item, timeslot, index }) => {
  const { meal, setEachMeal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((item) => item.timeSlots === timeslot);
  const { nowTimeSlot } = useZustand.useNowTimeSlot();
  const [quantity, setQuantity] = useState(item.quantity);

  const changeQuantityOnBlurHandler = async () => {
    //food 수정
    const quantityfoods = eachMeal.quantityfoods.map((food) => {
      return { foodId: food.foodId, quantity: food.quantity };
    });

    const patchFood = quantityfoods.map((food) =>
      food.foodId === item.foodId
        ? { foodId: food.foodId, quantity: quantity }
        : food
    );
    const result = await changeEachMeal(
      meal,
      eachMeal.eachMealId,
      timeslot,
      patchFood
    );
    setEachMeal(result);
  };

  const deleteOnClickHandler = async () => {
    //food 삭제
    const quantityfoods = eachMeal.quantityfoods.map((food) => {
      return { foodId: food.foodId, quantity: food.quantity };
    });
    const patchFood = quantityfoods.filter(
      (food) => food.foodId !== item.foodId
    );
    const result = await changeEachMeal(
      meal,
      eachMeal.eachMealId,
      timeslot,
      patchFood
    );
    setEachMeal(result);
  };

  return (
    <StyleFood>
      <p>{item.foodName}</p>
      <p>
        {nowTimeSlot === timeslot ? (
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value >= 0 ? e.target.value : 0)
            }
            onBlur={changeQuantityOnBlurHandler}
          />
        ) : (
          quantity
        )}
        인분
      </p>
      {nowTimeSlot === timeslot ? (
        <Button
          primary={true}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            fontSize: "14px",
            fontWeight: "800",
          }}
          onClick={deleteOnClickHandler}
        >
          X
        </Button>
      ) : null}
    </StyleFood>
  );
};

export default IsEachFood;
