import Button from "../../atom/button";
import FoodSearchForm from "./FoodSearchForm";

const IsEachMeal = ({ eachMeal, timeslot, isSearchForm, setIsSearchForm }) => {
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };

  return (
    <div>
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
        <Button
          onClick={() => {
            setIsSearchForm(timeslot);
          }}
          disabled={isSearchForm === timeslot ? true : null}
        >
          음식 추가하기
        </Button>
      </div>
      {isSearchForm === timeslot ? (
        <FoodSearchForm eachMeal={eachMeal} timeslot={timeslot} />
      ) : null}
    </div>
  );
};

export default IsEachMeal;
