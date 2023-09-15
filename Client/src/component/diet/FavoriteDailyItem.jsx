import { styled } from "styled-components";
import Button from "../../atom/button";

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

const FavoriteDailyItem = ({ item, setIsDetailPage }) => {
  const loadFavoriteMealOnClickHandler = async () => {
    setIsDetailPage(item.dailyMealId);
  };

  const deleteFavoriteMealOnClickHandler = async () => {
    console.log("deleteFavoriteMealOnClickHandler!");
    return null;
  };

  return (
    <DivItemStyle>
      <Button onClick={loadFavoriteMealOnClickHandler}>
        <h3>{item.name}</h3>
        <p> 칼로리: {item.totalDailyKcal}kcal</p>
        <p> 탄수화물: {item.totalDailyCarbo}g</p>
        <p> 단백질: {item.totalDailyProtein}g</p>
        <p> 지방: {item.totalDailyFat}g</p>
      </Button>
      <Button onClick={deleteFavoriteMealOnClickHandler} primary={false}>
        X
      </Button>
    </DivItemStyle>
  );
};
export default FavoriteDailyItem;
