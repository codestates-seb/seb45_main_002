import { useEffect, useState } from "react";
import axios from "axios";
import PostNewDailyDiet from "./PostNewDailyDiet";

const today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); //일

const GetDailyDiet = (
  dateStr = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`
) => {
  const [meal, setMeal] = useState();
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    axios
      .get(`http://43.201.194.176:8080/dailymeals/date/${dateStr}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        setMeal(response.data);
      })
      .catch((error) => {
        console.log(error);
        setMeal(PostNewDailyDiet(dateStr));
      });
  }, [dateStr, token]);

  return meal;
};

export default GetDailyDiet;
