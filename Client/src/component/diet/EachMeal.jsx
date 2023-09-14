import Button from "../../atom/button";
import { PostEachMeal } from "../../util/Diet";

const EachMeal = ({ meal, timeslot, index, setMeal }) => {
  const EachMealAddHandler = async (meal, timeslot) => {
    const result = await PostEachMeal(meal, timeslot);
    await setMeal(null);
    await EachMealAddHandler2(result);
  };

  const EachMealAddHandler2 = (result) => {
    setMeal({ ...result });
  };

  // 1: 아침, 2: 점심, 3: 저녁
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };

  console.log(timeslot);
  for (let eachMeal of meal.eachMeals) {
    console.log(eachMeal.timeSlots);
    if (eachMeal.timeSlots === timeslot) {
      // dailyMeal에 해당하는 timeslot의 eachMeal이 등록되어있는 경우
      return (
        <div className={timelabel[timeslot]}>
          <h2>{timelabel[timeslot]}</h2>
          {eachMeal.foods?.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.foodName}</p>
                <p>{item.quantity}인분</p>
              </div>
            );
          }) ?? null}
          <Button>음식 추가하기</Button>
        </div>
      );
    }
  }

  // dailyMeal에 해당하는 timeslot의 eachMeal이 등록되어있지 않는 경우
  return (
    <div className={timelabel[timeslot]} key={index}>
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

export default EachMeal;
