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
