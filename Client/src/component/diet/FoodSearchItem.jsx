import { useState } from "react";

import useZustand from "../../zustand/Store";
import Button from "../../atom/button";
import { changeEachMeal } from "../../util/Diet";

const FoodSearchItem = ({ item, timeslot }) => {
  const { meal, setEachMeal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((item) => item.timeSlots === timeslot);
  const [quantity, setQuantity] = useState(1);

  const addFoodOnClickHandler = async () => {
    let quantityfoods = [];
    if (eachMeal.quantityfoods) {
      if (Array.isArray(eachMeal.quantityfoods)) {
        quantityfoods = eachMeal.quantityfoods.map((item) => {
          return { foodId: item.foodId, quantity: item.quantity };
        });
      }
    }
    const patchFood = [
      ...quantityfoods,
      { foodId: item.foodId, quantity: quantity },
    ];
    const result = await changeEachMeal(
      eachMeal.eachMealId,
      meal.dailyMealId,
      timeslot,
      patchFood
    );
    const food = result.quantityfoods.find(
      (food) => food.foodId === item.foodId
    );

    const resultEachMeal = {
      ...meal,
      eachMeals: [
        ...meal.eachMeals.map((eachMeal) => {
          if (eachMeal.timeSlots === timeslot) {
            return {
              ...eachMeal,
              quantityfoods: [...eachMeal.quantityfoods, food],
            };
          } else {
            return eachMeal;
          }
        }),
      ],
      totalDailyCarbo: meal.totalDailyCarbo + food.ratioEachCarbo * quantity,
      totalDailyFat: meal.totalDailyFat + food.ratioEachFat * quantity,
      totalDailyKcal: meal.totalDailyKcal + food.ratioEachKcal * quantity,
      totalDailyProtein:
        meal.totalDailyProtein + food.ratioEachProtein * quantity,
    };

    setEachMeal(resultEachMeal);
  };

  return (
    <li>
      <p>
        {item.foodName}: {item.kcal}kcal
      </p>
      <input type="number" value={quantity} onChange={() => setQuantity()} />
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
