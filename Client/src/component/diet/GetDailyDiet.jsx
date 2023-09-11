import { useEffect, useState } from "react";
import axios from "axios";

const GetDailyDiet = (dateStr) => {
  const [meal, setMeal] = useState();
  const token = "";

  useEffect(() => {
    axios
      .get(`http://43.201.194.176:8080/dailymeals/${dateStr}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        // 성공한 경우 실행
        console.log(response);
        setMeal(() => {
          return response.data;
        });
      })
      .catch((error) => {
        // 에러인 경우 실행
        console.log(error);
      });
  }, [dateStr]);

  return meal;
};

export default GetDailyDiet;
