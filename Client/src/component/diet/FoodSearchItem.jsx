import { useState } from "react";

import useZustand from "../../zustand/Store";
import Button from "../../atom/button";
import { changeEachMeal } from "../../util/Diet";

const FoodSearchItem = ({ item, timeslot }) => {
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
    <li>
      <p>
        {item.foodName}: {item.kcal}kcal
      </p>
      <input
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <Button
        size={"square"}
        style={{ width: "20px", height: "20px" }}
        onClick={addFoodOnClickHandler}
      >
        +
      </Button>
    </li>
  );
};

export default FoodSearchItem;
