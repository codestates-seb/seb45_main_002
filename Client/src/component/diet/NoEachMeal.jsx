import Button from "../../atom/button";
import useZustand from "../../zustand/Store";

const NoEachMeal = ({ timeslot, EachMealAddHandler }) => {
  const { meal } = useZustand.useDailyMeals();
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };

  return (
    <div className={timelabel[timeslot]}>
      <h2>{timelabel[timeslot]}</h2>
      <Button
        onClick={() => {
          EachMealAddHandler(meal, timeslot);
        }}
      >
        끼니 추가하기
      </Button>
      <Button>저장해둔 끼니 불러오기</Button>
      <Button>끼니 추천하기</Button>
    </div>
  );
};

export default NoEachMeal;
