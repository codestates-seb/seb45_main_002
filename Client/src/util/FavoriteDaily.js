import axios from "axios";

const token = localStorage.getItem("Authorization");
const url = "http://43.201.194.176:8080";

export const postFavoriteDailyMeal = async (
  eachMeals,
  name = "",
  date = ""
) => {
  //date가 ""일 경우 Daily에서 FavoriteDaily생성
  //date가 날짜일 경우 FavoriteDaily에서 Daily생성
  const newEachMealID = [];
  for (let eachMeal of eachMeals) {
    //끼니 복사
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
  //복사된 끼니를 포함하여 FavoriteDaily 추가
  return axios
    .post(
      `${url}/dailymeals`,
      {
        name: name,
        date: date ? date : null,
        eachMeals: newEachMealID,
      },
      { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postFavoriteEachMeal = async (eachMeal) => {
  //date가 ""일 경우 Each에서 FavoriteEach생성
  //date가 날짜일 경우 FavoriteEach에서 Each생성
  return await axios
    .post(
      `${url}/eachmeals`,
      {
        timeSlots: eachMeal.timeSlots,
        favorite: true,
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
    });
};

export const getFavoriteDailyMeal = async (page = 1) => {
  //FavoriteDailyList Get요청
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

export const getFavoriteEachMeal = async (page = 1) => {
  //FavoriteEachList Get요청
  return await axios
    .get(`${url}/eachmeals/favorite?page=${page}&size=6`, {
      headers: { Authorization: token },
    })
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getEachMeal = async (eachMealId) => {
  return await axios
    .get(`${url}/eachmeals/${eachMealId}`, {
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
