import axios from "axios";
import { useState, useEffect } from "react";

const token = localStorage.getItem("Authorization");
const url = "http://43.201.194.176:8080";

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
  const [food, setFood] = useState();
  axios
    .get(`${url}/foods/${foodId}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      // 성공한 경우 실행
      console.log(response);
      setFood(() => {
        return response.data;
      });
    })
    .catch((error) => {
      // 에러인 경우 실행
      console.log(error);
    });
  return food;
};

const today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); //일

export const GetDailyDiet = (
  dateStr = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`
) => {
  const url1 = `${url}/dailymeals`;
  const url2 = `${url}/dailymeals/date/${dateStr}`;
  console.log(url2);
  const [meal, setMeal] = useState();

  useEffect(() => {
    axios
      .get(url2, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        setMeal(() => response.data);
      })
      .catch((error) => {
        console.log(error);
        //불러오기 실패시 post요청으로 dailymeals 생성
        if (error.response.data === "DailyMeal not found...") {
          axios
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
              setMeal(() => {
                setMeal(response.data);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }, [dateStr, url1, url2]);

  return meal;
};

export const changeEachMeal = async (eachmeal, timeslot, foodId, quantity) => {
  axios
    .patch(
      `${url}/eachmeals/${eachmeal.eachMealId}`,
      {
        timeslot: timeslot,
        foods: [
          ...eachmeal.quantityfoods.map((item) => {
            return { foodId: item.foodId, quantity: quantity };
          }),
          { foodId: foodId, quantity: quantity },
        ],
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
