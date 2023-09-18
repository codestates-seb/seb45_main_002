import { styled } from "styled-components";
import Button from "../../atom/button";
import { deleteEachMeal } from "../../util/Diet";
import { CopyEachMeal } from "../../util/FavoriteDaily";
import useZustand from "../../zustand/Store";

const DivItemStyle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  gap: 5px;

  & > button:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px 20px 40px 20px;

    & > p:first-child {
      width: 100%;
      overflow-x: auto;
    }
  }

  & > button:last-child {
    position: absolute;
    left: calc(100px - 10px);
    bottom: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 14px;
  }
`;

const FavoriteEachItem = ({ item, setPage, setIsModal, timeslot, detail }) => {
  const { meal, setMeal } = useZustand.useDailyMeals();
  console.log(detail);
  const copyFavoriteMealOnClickHandler = async () => {
    setMeal(await CopyEachMeal(meal, detail, timeslot));
    setIsModal(false);
  };

  const deleteFavoriteMealOnClickHandler = async () => {
    await deleteEachMeal(item.eachMealId).then(async () => {
      await setPage(null);
    });
  };

  return (
    <DivItemStyle>
      <Button onClick={copyFavoriteMealOnClickHandler}>
        <p>
          {detail
            ? detail.quantityfoods.map((food) => `${food.foodName}, `)
            : null}
        </p>
        <p> 칼로리: {item.totalEachKcal}kcal</p>
        <p> 탄수화물: {item.totalEachCarbo}g</p>
        <p> 단백질: {item.totalEachProtein}g</p>
        <p> 지방: {item.totalEachFat}g</p>
      </Button>
      <Button onClick={deleteFavoriteMealOnClickHandler} primary={false}>
        X
      </Button>
    </DivItemStyle>
  );
};
export default FavoriteEachItem;
