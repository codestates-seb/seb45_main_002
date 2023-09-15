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
  }
`;

const IsEachFood = ({ item, timeslot, index }) => {
  const { meal, setEachMeal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((item) => item.timeSlots === timeslot);
  const [quantity, setQuantity] = useState(item.quantity);

  const changeQuantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const deleteOnClickHandler = async () => {
    const quantityfoods = eachMeal.quantityfoods.map((food) => {
      return { foodId: food.foodId, quantity: food.quantity };
    });

    const patchFood = quantityfoods.filter(
      (food) => food.foodId !== item.foodId
    );

    await changeEachMeal(
      eachMeal.eachMealId,
      meal.dailyMealId,
      timeslot,
      patchFood
    );

    const resultEachMeal = {
      ...meal,
      eachMeals: [
        ...meal.eachMeals.map((eachMeal) => {
          if (eachMeal.timeSlots === timeslot) {
            return {
              ...eachMeal,
              quantityfoods: [
                ...eachMeal.quantityfoods.filter(
                  (food) => food.foodId !== item.foodId
                ),
              ],
            };
          } else {
            return eachMeal;
          }
        }),
      ],
      totalDailyCarbo:
        meal.totalDailyCarbo - item.ratioEachCarbo * item.quantity,
      totalDailyFat: meal.totalDailyFat - item.ratioEachFat * item.quantity,
      totalDailyKcal: meal.totalDailyKcal - item.ratioEachKcal * item.quantity,
      totalDailyProtein:
        meal.totalDailyProtein - item.ratioEachProtein * item.quantity,
    };

    setEachMeal(resultEachMeal);
  };

  return (
    <StyleFood>
      <p>{item.foodName}</p>
      <p>
        <input
          type="number"
          value={quantity}
          onChange={changeQuantityHandler}
        />
        인분
      </p>
      <Button
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
        }}
        onClick={deleteOnClickHandler}
      >
        ❌
      </Button>
    </StyleFood>
  );
};

export default IsEachFood;
