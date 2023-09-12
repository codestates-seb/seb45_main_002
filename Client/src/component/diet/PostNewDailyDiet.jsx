import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostNewDailyDiet = (dateStr) => {
  const navigate = useNavigate();
  const [meal, setMeal] = useState();
  const token = localStorage.getItem("access_token");
  axios
    .post(
      "http://43.201.194.176:8080/dailymeals",
      {
        name: "name",
        date: dateStr,
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
      navigate("/pageswitch/diet/${dateStr}");
    })
    .catch((err) => console.log(err));

  return meal;
};

export default PostNewDailyDiet;
