import { styled } from "styled-components";
import axios from "axios";
import { useState } from "react";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 80%;
  height: 100vh;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const PostDietAnalyze = async (daliymealId, setAnalyzedData) => {
  const token = localStorage.getItem("Authorization");

  try {
    const response = await axios.post(
      "http://43.201.194.176:8080/analysis/374",
      // ${daliymealId},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("postDietAnalyze COMPLETE");
    console.log(response.data);
    setAnalyzedData(response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting DietAnalyze");
  }
};

export const GetDietAnalyze = async (analyzedData) => {
  const token = localStorage.getItem("Authorization");
  const analysisId = 333333333;
  // analyzedData.analysisId;
  try {
    const response = await axios.get(
      `http://43.201.194.176:8080/analysis/${analysisId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("getDietAnalyze COMPLETE", response.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting DietAnalyze");
  }
  return (
    <Container>
      <FlexContainer>
        <ItemContainer></ItemContainer>
      </FlexContainer>
    </Container>
  );
};
