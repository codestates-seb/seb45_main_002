import { styled } from "styled-components";

import Button from "../../atom/button";
import useZustand from "../../zustand/Store";
import Modal from "../../atom/GlobalModal";
import { useState } from "react";
import axios from "axios";
import { changeEachMeal } from "../../util/Diet";

const StyleEachMeal = styled.div`
  margin: 5px;
  width: calc(50% - 10px);
  height: 240px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @media (max-width: 800px) {
    width: calc(100% - 10px);
  }
`;

const ModalContainer = styled.div`
  max-width: 768px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const SpanContainer = styled.div`
  gap: 3px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
`;

const NoEachMeal = ({
  timeslot,
  EachMealAddHandler,
  loadFavoriteEachOnclickHandler,
}) => {
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };
  const { meal, setMeal, setEachMeal } = useZustand.useDailyMeals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);
  const [quantity, setQuantity] = useState();
  // console.log(meal.dailyMealId);

  const recommendMealHandler = async ({ item, timeslot, index }) => {
    try {
      const recommendedData = await axios.patch(
        `http://43.201.194.176:8080/dailymeals/suggest/${meal.dailyMealId}`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      setMeal(recommendedData.data);

      const fixedData = recommendedData.data.eachMeals.map(async (eachMeal) => {
        try {
          const data = {
            timeSlots: eachMeal.timeSlots,
            favorite: eachMeal.favorite,
            foods: eachMeal.quantityfoods.map((food) => ({
              foodId: food.foodId,
              quantity: food.quantity,
            })),
          };

          console.log(data);

          const response = await axios.patch(
            `http://43.201.194.176:8080/eachmeals/${eachMeal.eachMealId}`,
            data,
            {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            }
          );

          return response.data;
        } catch (error) {
          console.error("Error in PATCH request", error);
          throw error;
        }
      });

      try {
        const updatedData = await Promise.all(fixedData);
        console.log(updatedData);
      } catch (error) {
        console.error("Error in processing PATCH requests", error);
      }
    } catch (error) {
      console.error("Error in recommended", error);
    }
  };
  ////
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setModalContent(
      <>
        <ModalContainer>
          <SpanContainer>
            권장 칼로리와 영양소를 분석하여 <br />
            채워지지 않은 식단을 모두 채웁니다.
            <br />
            진행하시겠습니까? <br />
          </SpanContainer>

          <Button primary={true} onClick={recommendMealHandler} size={"small"}>
            확인
          </Button>
        </ModalContainer>
      </>
    );
  };

  return (
    <StyleEachMeal className={timelabel[timeslot]}>
      <Modal
        isOpen={isModalOpen}
        content={modalContent}
        header={modalHeader}
        footer={modalFooter}
        setIsOpen={setIsModalOpen}
        setContent={setModalContent}
        setHeader={setModalHeader}
        setFooter={setModalFooter}
      />
      <h2>{timelabel[timeslot]}</h2>
      <Button
        primary={true}
        onClick={() => {
          EachMealAddHandler(meal, timeslot);
        }}
      >
        끼니 새로 만들기
      </Button>
      <Button onClick={loadFavoriteEachOnclickHandler}>
        저장해둔 끼니 불러오기
      </Button>
      <Button onClick={handleOpenModal}>끼니 추천받기</Button>
    </StyleEachMeal>
  );
};

export default NoEachMeal;

//   const eachMeal = meal.eachMeals.find((meal) => meal.timeSlots === timeslot);
//   console.log(eachMeal);
//   const quantityfoods = eachMeal.quantityfoods.map((food) => {
//     return { foodId: food.foodId, quantity: food.quantity };
//   });
//   console.log(quantityfoods);

//   const patchFood = quantityfoods.map((food) =>
//     food.foodId === item.foodId
//       ? { foodId: food.foodId, quantity: quantity }
//       : food
//   );
//   console.log(patchFood);

//   const result = await changeEachMeal(
//     meal,
//     eachMeal.eachMealId,
//     timeslot,
//     patchFood
//   );

//   console.log(result);
//   setEachMeal(result);

//   const eachMealIds = eachMeal.map((meal) => meal.eachMealId);

//   const fixedData = await axios.patch(
//     (`http://43.201.194.176:8080/eachmeals/${meal.eachMeals.eachMealId}`,
//     {
//       name: "name",
//       favorite: false,
//       eachMeals: eachMealIds,
//     },
//     {
//       headers: {
//         Authorization: localStorage.getItem("Authorization"),
//       },
//     })
//   );
//   fixedData();
// };

// const handleEachMealChange = async () => {
//   const quantityfoods = recommendedData.data.eachMeals.quantityfoods.map(
//     (food) => {
//       return { foodId: food.foodId, quantity: food.quantity };
//     }
//   );
//   console.log(quantityfoods);

//   const patchFood = quantityfoods.map((food) =>
//     food.foodId === item.foodId
//       ? { foodId: food.foodId, quantity: quantity }
//       : food
//   );

//   const result = await changeEachMeal(
//     meal,
//     recommendedData.data.eachMeals.eachMealId,
//     timeslot,
//     patchFood
//   );

//   setEachMeal(result);
// };
// await handleEachMealChange();
// console.log(eachMealIds);
