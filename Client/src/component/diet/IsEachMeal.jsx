import Button from "../../atom/button";
import useZustand from "../../zustand/Store";
import FoodSearchForm from "./FoodSearchForm";

const IsEachMeal = ({ timeslot }) => {
  const { meal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((item) => item.timeSlots === timeslot);
  const { nowTimeSlot, setNowTimeSlot } = useZustand.useNowTimeSlot();
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };

  console.log(eachMeal);

  return (
    <div>
      <div className={timelabel[timeslot]}>
        <h2>{timelabel[timeslot]}</h2>
        {eachMeal.quantityfoods?.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.foodName}</p>
              <p>{item.quantity}인분</p>
            </div>
          );
        }) ?? null}
        <Button
          onClick={() => {
            setNowTimeSlot(timeslot);
          }}
          disabled={nowTimeSlot === timeslot ? true : null}
        >
          음식 추가하기
        </Button>
      </div>
      {nowTimeSlot === timeslot ? <FoodSearchForm timeslot={timeslot} /> : null}
    </div>
  );
};

export default IsEachMeal;
