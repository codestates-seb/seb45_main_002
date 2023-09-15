import { styled } from "styled-components";

import Button from "../../atom/button";
import useZustand from "../../zustand/Store";
import FoodSearchForm from "./FoodSearchForm";
import IsEachFood from "./IsEachFood";

const StyleEachMeal = styled.div`
  margin: 5px;
  width: 100%;
  height: max-content;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: top;

  gap: 10px;

  & > div {
    width: calc(50% - 10px);
  }

  @media (max-width: 800px) {
    flex-direction: column;

    & > div {
      width: calc(100% - 10px);
    }
  }

  h2 {
    width: 100%;
    height: 48px;
    background-color: #ffc123;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 10px 20px;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  & > div > button {
    width: 100%;
    border-top: 0 !important;
    border-radius: 0;

    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &:disabled {
      border-color: #ffc123;
    }
  }
`;

const IsEachMeal = ({ timeslot }) => {
  const { meal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((item) => item.timeSlots === timeslot);
  const { nowTimeSlot, setNowTimeSlot } = useZustand.useNowTimeSlot();
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };

  return (
    <StyleEachMeal>
      <div className={timelabel[timeslot]}>
        <h2>{timelabel[timeslot]}</h2>
        {eachMeal.quantityfoods?.map((item, index) => {
          return (
            <IsEachFood
              item={item}
              timeslot={timeslot}
              index={index}
              key={index}
            />
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
    </StyleEachMeal>
  );
};

export default IsEachMeal;
