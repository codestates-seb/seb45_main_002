import { styled } from "styled-components";
import axios from "axios";
import Button from "../../atom/button";

const Container = styled.div`
  display: flex;
  padding: 10px;
  max-width: 768px;
  width: 90%;
  height: 100vh;

  border: 1px solid black;
`;

const FlexContainer = styled.div`
  max-width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  aligns-item: center;

  border: 1px solid red;
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
`;

const GetDeailyMeal = async () => {
  const token = localStorage.getItem("Authorization");
  console.log(token);
  try {
    const response = await axios.post(
      `http://43.201.194.176:8080/dailymeals/${mealId}`,
      {
        date: "2023-09-09",
        name: "name",
        favorite: true,
        eachMeals: [2],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Calendar Data Posted:", response.data);
  } catch (error) {
    console.error("Error posting calendar data:", error);
  }
};

const DietAnalyze = () => {
  return (
    <>
      <Container>
        <FlexContainer>
          <ItemContainer>timeslot 1</ItemContainer>
          <ItemContainer>timeslot 1</ItemContainer>
          <ItemContainer>timeslot 1</ItemContainer>
        </FlexContainer>
        <Button primary={primary} size={small} />
      </Container>
    </>
  );
};
