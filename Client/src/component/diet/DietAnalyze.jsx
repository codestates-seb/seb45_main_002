import { styled } from "styled-components";
import axios from "axios";
import React, { useState } from "react";

import Button from "../../atom/button";
import { ErrorResponse } from "@remix-run/router";

const Postbtn = styled.button`
  width: 100px;
  height: 20px;
  background-color: royalBlue;
  color: white;
  margin-right: 10px; /* 예시로 간격 추가 */
`;

export const AnalyzedDiet = async (dailymealId) => {
  try {
    const analyzeResponse = await axios.post(
      `http://43.201.194.176:8080/analysis/${dailymealId}`,
      null,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }
    );
    // console.log(analyzeResponse.data);
    const analysisId = analyzeResponse.data.analysisId;

    const getResponse = await axios.get(
      `http://43.201.194.176:8080/analysis/${analysisId}`,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }
    );

    return getResponse.data;
  } catch (error) {
    console.error("Error analyzing diet");
  }
};

export default AnalyzedDiet;

// const postDailymealData = async () => {
//   const token = localStorage.getItem("Authorization");
//   console.log(token);
//   try {
//     const response = await axios.post(
//       "http://43.201.194.176:8080/dailymeals",
//       {
//         date: "2023-09-20",
//         name: "test",
//         eachMeals: [59],
//       },
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     console.log("Calendar Data Posted:", response.data);
//   } catch (error) {
//     console.error("Error posting calendar data:");
//   }
// };

// const postMealData = async () => {
//   const token = localStorage.getItem("Authorization");
//   console.log(token);
//   try {
//     const response = await axios.post(
//       "http://43.201.194.176:8080/eachmeals",
//       {
//         timeSlots: 3,
//         foods: [
//           { foodId: 6, quantity: 0.5 },
//           { foodId: 23, quantity: 0.5 },
//         ],
//       },

//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     console.log("Calendar Data Posted:", response.data);
//   } catch (error) {
//     console.error("Error posting Meal data:");
//   }
// };
