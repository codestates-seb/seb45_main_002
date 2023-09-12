import { useEffect, useState } from "react";
import axios from "axios";

const today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); //일

const GetDailyDiet = (
  dateStr = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`
) => {
  const url = "http://43.201.194.176:8080/dailymeals";
  const url1 = `http://43.201.194.176:8080/dailymeals/date/${dateStr}`;
  console.log(url1);
  const [meal, setMeal] = useState();
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    axios
      .get(url1, {
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
              url,
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
  }, [dateStr, token, url, url1]);

  return meal;
};

export default GetDailyDiet;
