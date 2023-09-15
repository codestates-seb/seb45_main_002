import useZustand from "../../zustand/Store";
import Button from "../../atom/button";
import { changeEachMeal } from "../../util/Diet";
import { useState } from "react";

const FoodSearchItem = ({ item, timeslot }) => {
  const { meal, setEachMeal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((item) => item.timeSlots === timeslot);
  const [quantity, setQuantity] = useState(1);

  console.log(eachMeal);
  const addFoodOnClickHandler = async () => {
    const result = await changeEachMeal(
      meal.dailyMealId,
      eachMeal,
      timeslot,
      item.foodId,
      quantity
    );
    console.log(result);
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
