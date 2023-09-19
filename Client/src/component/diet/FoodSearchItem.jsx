import { useState } from "react";

import useZustand from "../../zustand/Store";
import Button from "../../atom/button";
import { changeEachMeal } from "../../util/Diet";
import { styled } from "styled-components";

const ListStyle = styled.li`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input {
    width: 40px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const FoodDetailButton = styled.p`
  cursor: pointer;
  &:hover {
    color: #898989;
  }
`;

const FoodSearchItem = ({ item, timeslot, foodDetailOnClickHandler }) => {
  const { meal, setEachMeal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((food) => food.timeSlots === timeslot);
  const [quantity, setQuantity] = useState(1);

  const addFoodOnClickHandler = async () => {
    let quantityfoods = [];
    if (eachMeal.quantityfoods) {
      if (Array.isArray(eachMeal.quantityfoods)) {
        quantityfoods = eachMeal.quantityfoods.map((food) => {
          return { foodId: food.foodId, quantity: food.quantity };
        });
      }
    }
    const beforeExist = quantityfoods.findIndex(
      (food) => food.foodId === item.foodId
    );
    if (beforeExist === -1) {
      const patchFood = [
        ...quantityfoods,
        { foodId: item.foodId, quantity: quantity },
      ];
      const result = await changeEachMeal(
        meal,
        eachMeal.eachMealId,
        timeslot,
        patchFood
      );

      setEachMeal(result);
    }
  };

  return (
    <ListStyle>
      <FoodDetailButton
        onClick={() => {
          foodDetailOnClickHandler(item.foodId);
        }}
      >
        {item.foodName} ({item.kcal}kcal)
      </FoodDetailButton>
      <div>
        <span>
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <p>인분</p>
        </span>
        <Button
          size={"square"}
          style={{ width: "20px", height: "20px" }}
          onClick={addFoodOnClickHandler}
        >
          +
        </Button>
      </div>
    </ListStyle>
  );
};

export default FoodSearchItem;
