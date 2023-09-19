import axios from "axios";
import { styled } from "styled-components";

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

const DietModify = async (daliymealId) => {
  const token = localStorage.getItem("Authorization");
  try {
    const response = await axios.patch(
      `http://43.201.194.176:8080/dailymeals/${daliymealId}`,
      {
        date: "2023-09-01",
        name: "name",
        favorite: false,
        eachMeals: [1, 2, 3],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("postDietAnalyze COMPLETE", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting DietAnalyze", error);
  }

  return (
    <Container>
      <FlexContainer>
        <ItemContainer></ItemContainer>
      </FlexContainer>
    </Container>
  );
};
