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
    console.log(food);
    setEachMeal(food, quantity, timeslot);
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
