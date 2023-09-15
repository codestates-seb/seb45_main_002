import { styled } from "styled-components";
import axios from "axios";
import { PostDietAnalyze, GetDietAnalyze } from "../diet/DietAnalyze";
import React, { useState } from "react";

const Postbtn = styled.button`
  width: 100px;
  height: 20px;
  background-color: royalBlue;
  color: white;
  margin-right: 10px; /* 예시로 간격 추가 */
`;

const postDailymealData = async () => {
  const token = localStorage.getItem("Authorization");
  console.log(token);
  try {
    const response = await axios.post(
      "http://43.201.194.176:8080/dailymeals",
      {
        date: "2023-09-21",
        name: "name",
        favorite: false,
        eachMeals: [72],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Calendar Data Posted:", response.data);
  } catch (error) {
    console.error("Error posting calendar data:");
  }
};

const postMealData = async () => {
  const token = localStorage.getItem("Authorization");
  console.log(token);
  try {
    const response = await axios.post(
      "http://43.201.194.176:8080/eachmeals",
      {
        timeSlots: 3,
        foods: [
          { foodId: 7, quantity: 0.5 },
          { foodId: 2, quantity: 0.5 },
        ],
      },

      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Calendar Data Posted:", response.data);
  } catch (error) {
    console.error("Error posting Meal data:");
  }
};

const PostButton = ({ dailymealId }) => {
  const [analyzedData, setAnalyzedData] = useState();
  const handlePostDietAnalyze = async () => {
    await PostDietAnalyze(dailymealId, setAnalyzedData);
    await GetDietAnalyze(analyzedData);
  };

  return (
    <div>
      <Postbtn onClick={handlePostDietAnalyze}>analyze post</Postbtn>
      <Postbtn onClick={postDailymealData}>post dailymeals</Postbtn>
      <Postbtn onClick={postMealData}>post MealData</Postbtn>
    </div>
  );
};

export { PostButton };
