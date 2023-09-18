import { styled } from "styled-components";

import Button from "../../atom/button";
import useZustand from "../../zustand/Store";

const StyleEachMeal = styled.div`
  margin: 5px;
  width: calc(50% - 10px);
  height: 240px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @media (max-width: 800px) {
    width: calc(100% - 10px);
  }
`;

const NoEachMeal = ({
  timeslot,
  EachMealAddHandler,
  loadFavoriteEachOnclickHandler,
}) => {
  const { meal } = useZustand.useDailyMeals();
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };

  return (
    <StyleEachMeal className={timelabel[timeslot]}>
      <h2>{timelabel[timeslot]}</h2>
      <Button
        primary={true}
        onClick={() => {
          EachMealAddHandler(meal, timeslot);
        }}
      >
        끼니 새로 만들기
      </Button>
      <Button onClick={loadFavoriteEachOnclickHandler}>
        저장한 끼니 불러오기
      </Button>
      <Button>끼니 추천받기</Button>
    </StyleEachMeal>
  );
};

export default NoEachMeal;
