import { styled } from "styled-components";
import Button from "../../atom/button";
import useZustand from "../../zustand/Store";
import { useEffect, useState } from "react";
import { getDailyMealId } from "../../util/Diet";
import { postFavoriteDailyMeal } from "../../util/FavoriteDaily";

const DivDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;

  & > h3 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  & > div.total {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  & > div:last-child {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
`;

const DivEachMealStyle = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;

  & > div {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    border: 2px solid #ffc123;
    overflow-y: auto;
    padding: 10px 20px;

    h4 {
      font-size: 18px;
      margin-bottom: 5px;
    }
  }
`;

const FavoriteDailyDetail = ({ id, setIsDetailPage, date, setIsModal }) => {
  const { setMeal } = useZustand.useDailyMeals();
  const [DailyMeal, setDailyMeal] = useState();

  useEffect(() => {
    const asyncfunc = async () => {
      setDailyMeal(await getDailyMealId(id));
    };
    asyncfunc();
  }, [id]);

  const backPageOnClickHandler = () => {
    setIsDetailPage(null);
  };

  const copyFavoriteMealOnClickHandler = async () => {
    const result = await postFavoriteDailyMeal(
      DailyMeal.eachMeals,
      "name",
      date
    );
    setMeal(result);
    setIsModal(false);
  };

  if (!DailyMeal) {
    return <>loading</>;
  }

  return (
    <DivDetailStyle>
      <h3>{DailyMeal.name}</h3>
      <DivEachMealStyle>
        {DailyMeal.eachMeals.map((eachMeal, index) => {
          return (
            <div key={index}>
              <h4>
                {eachMeal.timeSlots === 1
                  ? "아침"
                  : eachMeal.timeSlots === 2
                  ? "점심"
                  : eachMeal.timeSlots === 3
                  ? "저녁"
                  : ""}
              </h4>
              {eachMeal.quantityfoods.map((food, index) => {
                return <p>{food.foodName}</p>;
              })}
            </div>
          );
        })}
      </DivEachMealStyle>
      <div className="total">
        <p>칼로리: {DailyMeal.totalDailyKcal}kcal</p>
        <p>탄수화물: {DailyMeal.totalDailyCarbo}g</p>
        <p>단백질: {DailyMeal.totalDailyProtein}g</p>
        <p>지방: {DailyMeal.totalDailyFat}g</p>
      </div>
      <div>
        <Button onClick={backPageOnClickHandler}>뒤로 가기</Button>
        <Button onClick={copyFavoriteMealOnClickHandler} primary={true}>
          식단 선택
        </Button>
      </div>
    </DivDetailStyle>
  );
};

export default FavoriteDailyDetail;
