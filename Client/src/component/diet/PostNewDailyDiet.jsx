import axios from "axios";
import { useState } from "react";

const today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); //일

const PostNewDailyDiet = ({
  setMeal,
  dateStr = `${year}-${month}-${date}`,
}) => {
  const todaydate = new Date(dateStr);
  const token = localStorage.getItem("access_token");

  axios
    .post(
      "http://43.201.194.176:8080/dailymeals",
      {
        date: todaydate,
        name: null,
        favorite: false,
        eachMeals: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
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
    .catch((err) => console.log(err));

  return <>Error</>;
};

export default PostNewDailyDiet;
