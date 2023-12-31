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
      return response.data;
    })
    .catch((error) => {
      console.log(error);
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
      const result = [
        ...meal.eachMeals.map((item) => item.eachMealId),
        response.data.eachMealId,
      ];
      return PatchDailyMeal(meal, result);
    })
    .catch((error) => {
      // 에러인 경우 실행
      console.log(error);
    });
};

export const PatchDailyMeal = async (meal, eachmeal = null) => {
  const eachMealIDs = meal.eachMeals.map((item) => item.eachMealId);
  return axios
    .patch(
      `${url}/dailymeals/date/${meal.date}`,
      {
        name: "",
        eachMeals: eachmeal !== null ? eachmeal : eachMealIDs,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
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
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      //불러오기 실패시 post요청으로 dailymeals 생성
      if (error.response.data === "DailyMeal not found...") {
        return error.response.data;
      } else {
        return null;
      }
    });
};

export const PostDailyMeal = async (
  dateStr = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`
) => {
  return axios
    .post(
      `${url}/dailymeals`,
      {
        date: dateStr,
        name: "",
        eachMeals: [],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeEachMeal = async (meal, eachMealId, timeslot, patchFood) => {
  return axios
    .patch(
      `${url}/eachmeals/${eachMealId}`,
      {
        dailymealId: meal.dailymealId,
        timeSlots: timeslot,
        foods: patchFood,
      },
      { headers: { Authorization: token } }
    )
    .then((response) => {
      return PatchDailyMeal(meal);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDailyMealId = async (id) => {
  return await axios
    .get(`${url}/dailymeals/${id}`, { headers: { Authorization: token } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteDailyMealId = async (id) => {
  return await axios
    .delete(`${url}/dailymeals/${id}`, { headers: { Authorization: token } })
    .then((response) => {})
    .catch((error) => {
      console.log(error);

      if (error.response.data === "Invalid data...") {
        alert(
          "삭제에 실패했습니다.\n해당 식단으로 작성된 커뮤니티 게시글이 있는지 확인해주세요."
        );
      }
    });
};

export const getEachMeal = async (eachMealId) => {
  return await axios
    .get(`${url}/eachmeals/${eachMealId}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteEachMeal = async (eachMealId) => {
  return await axios
    .delete(`${url}/eachmeals/${eachMealId}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getFoodDetail = async (id) => {
  return await axios
    .get(`${url}/foods/${id}`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
