import axios from "axios";
const token = localStorage.getItem("Authorization");
const url = "http://43.201.194.176:8080";

const today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); //일

export const GetFoodKeyword = async (value) => {
  return axios
    .get(`${url}/search/foods?search-word=${value}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const PostEachMeal = async (meal, timeslot) => {
  return axios
    .post(
      `${url}/eachmeals`,
      {
        dailymealId: meal.dailymealsId,
        timeSlots: timeslot,
        foods: [],
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

      return axios
        .patch(
          `${url}/dailymeals/date/${meal.date}`,
          {
            name: "name",
            eachMeals: [
              ...meal.eachMeals.map((item) => item.eachMealId),
              response.data.eachMealId,
            ],
          },
          {
            headers: {
              Authorization: token,
              // "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      // 에러인 경우 실행
      console.log(error);
    });
};

export const GetFood = (foodId) => {
  return axios
    .get(`${url}/foods/${foodId}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      // 성공한 경우 실행
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      // 에러인 경우 실행
      console.log(error);
    });
};

export const GetDailyDiet = async (
  dateStr = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`
) => {
  return axios
    .get(`${url}/dailymeals/date/${dateStr}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      //불러오기 실패시 post요청으로 dailymeals 생성
      if (error.response.data === "DailyMeal not found...") {
        return null;
      }
    });
};

export const PostDailyMeal = async (dateStr) => {
  const url1 = `${url}/dailymeals`;
  return axios
    .post(
      url1,
      {
        name: "name",
        date: dateStr,
        favorite: false,
        eachMeals: [],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeEachMeal = async (
  dailymealId,
  eachmeal,
  timeslot,
  foodId,
  quantity
) => {
  let quantityfoods = [];
  if (eachmeal.quantityfoods) {
    if (Array.isArray(eachmeal.quantityfoods)) {
      quantityfoods = eachmeal.quantityfoods.map((item) => {
        return { foodId: item.foodId, quantity: item.quantity };
      });
    }
  }
  console.log(eachmeal);
  console.log(eachmeal.eachMealId);

  return axios
    .patch(
      `${url}/eachmeals/${eachmeal.eachMealId}`,
      {
        dailymealId: dailymealId,
        timeSlots: timeslot,
        foods: [...quantityfoods, { foodId: foodId, quantity: quantity }],
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
