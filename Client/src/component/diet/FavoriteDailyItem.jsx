import Button from "../../atom/button";
import useZustand from "../../zustand/Store";

const FavoriteDailyItem = (item) => {
  const { setMeal } = useZustand.useDailyMeals();

  const loadFavoriteMealOnClickHandler = async () => {
    // setMeal()
    return null;
  };

  const deleteFavoriteMealOnClickHandler = async () => {
    return null;
  };

  return (
    <Button
      onClick={loadFavoriteMealOnClickHandler}
      style={{
        width: "200px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <h3>{item.item.name}</h3>
      <p> 칼로리: {item.item.totalDailyKcal}kcal</p>
      <p> 탄수화물: {item.item.totalDailyCarbo}g</p>
      <p> 단백질: {item.item.totalDailyProtein}g</p>
      <p> 지방: {item.item.totalDailyFat}g</p>
      <Button
        onClick={deleteFavoriteMealOnClickHandler}
        primary={false}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          fontSize: "14px",
        }}
      >
        X
      </Button>
    </Button>
  );
};
export default FavoriteDailyItem;
