import { styled } from "styled-components";
import { useState } from "react";
import Button from "../../atom/button";

import useZustand from "../../zustand/Store";
import FoodSearchForm from "./FoodSearchForm";
import IsEachFood from "./IsEachFood";
import { deleteEachMeal } from "../../util/Diet";
import Modal from "../../atom/GlobalModal";

const StyleEachMeal = styled.div`
  margin: 5px;
  width: 100%;
  height: max-content;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: top;

  gap: 10px;

  & > div {
    width: calc(50% - 10px);
  }

  @media (max-width: 800px) {
    flex-direction: column;

    & > div {
      width: calc(100% - 10px);
    }
  }

  h2 {
    width: 100%;
    height: 48px;
    background-color: #ffc123;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 10px 20px;
    display: flex;
    justify-content: right;
    align-items: center;

    span {
      font-size: 12px;
    }
  }
`;

const DivSummary = styled.div`
  width: 100%;
  height: 48px;
  background-color: white;
  border: 2px solid #ffc123;
  border-top: 0 !important;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  p {
    font-size: 12px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    gap: 5px;
  }
`;

const IsEachMeal = ({
  timeslot,
  addEachMealOnClickHandler,
  foodDetailOnClickHandler,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);

  const { meal, setMeal } = useZustand.useDailyMeals();
  const eachMeal = meal.eachMeals.find((item) => item.timeSlots === timeslot);
  const { nowTimeSlot, setNowTimeSlot } = useZustand.useNowTimeSlot();
  const timelabel = { 1: "breakfast", 2: "lunch", 3: "dinner" };

  return (
    <StyleEachMeal>
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
      <div className={timelabel[timeslot]}>
        <h2>
          <p>{timelabel[timeslot]}</p>
          {nowTimeSlot === timeslot ? (
            <Button
              onClick={() => {
                if (eachMeal && eachMeal.quantityfoods.length === 0) {
                  deleteEachMeal(eachMeal.eachMealId);

                  const updatedEachMeals = meal.eachMeals.filter(
                    (item) => item.eachMealId !== eachMeal.eachMealId
                  );

                  setMeal({
                    ...meal,
                    eachMeals: updatedEachMeals,
                  });
                } else {
                  setIsModalOpen(true);
                  setModalHeader(
                    <div style={{ padding: "10px" }}>
                      <h4 style={{ marginBottom: "-80px", color: "black" }}>
                        음식이 끼니에 남아있어요!
                      </h4>
                    </div>
                  );
                }
              }}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                fontSize: "14px",
                fontWeight: "800",
                marginLeft: "5px",
              }}
            >
              ✕
            </Button>
          ) : null}
        </h2>
        {eachMeal.quantityfoods?.map((item, index) => {
          return (
            <IsEachFood
              item={item}
              timeslot={timeslot}
              foodDetailOnClickHandler={foodDetailOnClickHandler}
              key={index}
            />
          );
        }) ?? null}
        <DivSummary>
          <div>
            <p>칼로리: {eachMeal.totalEachKcal}kcal</p>
            <p>단백질: {eachMeal.totalEachProtein}g</p>
          </div>
          <div>
            <p>탄수화물: {eachMeal.totalEachCarbo}g</p>
            <p>지방: {eachMeal.totalEachFat}g</p>
          </div>
          {nowTimeSlot === timeslot ? (
            <Button
              onClick={() => addEachMealOnClickHandler(eachMeal)}
              size={"small"}
              style={{ fontSize: "14px" }}
            >
              선호 끼니 저장하기
            </Button>
          ) : (
            <Button
              onClick={() => {
                setNowTimeSlot(timeslot);
              }}
              size={"small"}
              style={{ fontSize: "14px" }}
            >
              끼니 수정하기
            </Button>
          )}
        </DivSummary>
      </div>
      {nowTimeSlot === timeslot ? (
        <FoodSearchForm
          timeslot={timeslot}
          foodDetailOnClickHandler={foodDetailOnClickHandler}
        />
      ) : null}
    </StyleEachMeal>
  );
};

export default IsEachMeal;
