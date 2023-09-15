import axios from "axios";
const token = localStorage.getItem("Authorization");
const url = "http://43.201.194.176:8080";

export const postFavoriteDailyMeal = async (eachMeals, name = "") => {
  //De=ailyMeaal
  const newEachMealID = [];
  for (let eachMeal of eachMeals) {
    newEachMealID.push(
      await axios
        .post(
          `${url}/eachmeals`,
          {
            timeSlots: eachMeal.timeSlots,
            foods: eachMeal.quantityfoods.map((food) => {
              return { foodId: food.foodId, quantity: food.quantity };
            }),
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(async (response) => {
          // 성공한 경우 실행
          console.log(response);
          return response.data.eachMealId;
        })
        .catch((error) => {
          // 에러인 경우 실행
          console.log(error);
        })
    );
  }

  axios
    .post(
      `${url}/dailymeals`,
      {
        name: name,
        date: null,
        eachMeals: newEachMealID,
      },
      { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getFavoriteDailyMeal = async (page = 1) => {
  return axios
    .get(`${url}/dailymeals?page=${page}&size=6`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
