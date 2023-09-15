import { styled } from "styled-components";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "../../atom/GlobalModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import StyledCalendar from "../style/CalendarStyle";
import "moment/locale/ko";
import axios from "axios";
import useZustand from "../../zustand/Store";
import style from "../../style/style";
import Button from "../../atom/button";
import { PostDietAnalyze, GetDietAnalyze } from "../diet/DietAnalyze";

import { postCalendarData, PostButton } from "./PostMealBtn";

const CalendarContainer = styled.div`
  max-width: 768px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  padding: 0;
`;

const DropdownButton = styled.button`
  width: 200px;
  height: 48px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-family: SUIT Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
`;

const CustomDot = styled.div`
  width: 9px;
  height: 8px;
  border-radius: 50%;
  background-color: #ffc123;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ItemContainer = styled.div`
  width: 80%;
  height: 30%;
`;

const customToolbar = (toolbar) => {
  const goToPrev = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  return (
    <div className="rbc-toolbar">
      {/* <span className="rbc-btn-group"></span> */}
      <span className="rbc-btn-group">
        <button type="button" onClick={goToPrev} style={{ border: "none" }}>
          &lt;
        </button>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <button type="button" onClick={goToNext} style={{ border: "none" }}>
          &gt;
        </button>
      </span>
    </div>
  );
};

const CustomCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);
  const [dailymealId, setDailymealId] = useState(null);
  // const [mealData, setMealData] = useState(null);
  const [events, setEvents] = useState([
    {
      title: "eventTitle",
      start: new Date(2023, 8, 12),
      end: new Date(2023, 8, 12),
    },
  ]);

  useEffect(() => {
    const fetchedMeals = async () => {
      const token = localStorage.getItem("Authorization");
      // console.log(localStorage.getItem("Authorization"));

      try {
        const response = await axios.get(
          "http://43.201.194.176:8080/dailymeals/date?page=1&size=5",
          {
            headers: { Authorization: token },
          }
        );
        const mealData = response.data;
        console.log(mealData);
        // console.log(mealData[0].dailyMealId);
        setDailymealId(mealData[0].dailyMealId);

        // console.log(mealData);
        // console.log(mealData[0]);
        ///Object { dailyMealId: 319, date: "2023-09-13", name: "name", favorite: false, totalDailyKcal: 0, totalDailyCarbo: 0, totalDailyProtein: 0, totalDailyFat: 0 }
        // console.log(mealData[0].date.replace(/-/g, ","));
        /// 2023,09,13

        const newEvent = mealData.map((meal) => ({
          start: new Date(meal.date.replace(/-/g, ",")),
          end: new Date(meal.date.replace(/-/g, ",")),
        }));
        // console.log(newEvent[0]);

        setEvents((prevEvents) => [...prevEvents, ...newEvent]);
        // console.log(events);
      } catch (error) {
        console.error("fetch error meals:");
      }
    };
    fetchedMeals();
  }, []);

  const handleEventClick = (event) => {
    const eventTitle = event.title;
    const startDate = new Date(event.start);
    startDate.setDate(startDate.getDate() + 1);
    const dateStr = startDate.toISOString().split("T")[0];

    // console.log(event);
    // console.log(event.start);
    // console.log(dateStr);

    const fetchDailymeal = async () => {
      const token = localStorage.getItem("Authorization");
      // console.log(localStorage.getItem("Authorization"));

      try {
        console.log(dateStr);
        const response = await axios.get(
          `http://43.201.194.176:8080/dailymeals/date/${dateStr}`,
          console.log(token),
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const mealData = response.data;
        // console.log(mealData);
        // const mealData = {
        //   dailyMealId: 13,
        //   memberId: 1,
        //   date: "2023-09-15",
        //   name: "name",
        //   favorite: false,
        //   eachMeals: ["밥,고기,김치"],
        //   totalDailyKcal: 51.0,
        //   totalDailyCarbo: 7.0,
        //   totalDailyProtein: 1.0,
        //   totalDailyFat: 2.0,
        // };
        console.log(mealData);
        setModalHeader(<h2>{eventTitle}</h2>);
        setModalContent(
          <ModalContainer>
            <h3>식단 정보</h3>

            {mealData.eachMeals.map((meal, index) => (
              <ItemContainer key={index}>
                {meal.timeSlots === 1 && (
                  <div>
                    <h4>아침</h4>
                    <p>
                      메뉴:{" "}
                      {meal.quantityfoods
                        .map((food) => food.foodName)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </ItemContainer>
            ))}

            {mealData.eachMeals.map((meal, index) => (
              <ItemContainer key={index}>
                {meal.timeSlots === 2 && (
                  <div>
                    <h4>점심</h4>
                    <p>
                      메뉴:{" "}
                      {meal.quantityfoods
                        .map((food) => food.foodName)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </ItemContainer>
            ))}
            {mealData.eachMeals.map((meal, index) => (
              <ItemContainer key={index}>
                {meal.timeSlots === 3 && (
                  <div>
                    <h4>저녁</h4>
                    <p>
                      메뉴:{" "}
                      {meal.quantityfoods
                        .map((food) => food.foodName)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </ItemContainer>
            ))}
            <p>총 칼로리: {mealData.totalDailyKcal}</p>
            <Button
              width="80px"
              height="20px"
              // onClick={func}
              fontSize="10px"
              size="small"
              backgroundColor="#ffc123"
              children="식단 수정"
            ></Button>
          </ModalContainer>
        );
        console.log(mealData.eachMeals[0].quantityfoods);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching meal:");
      }
    };
    fetchDailymeal();
  };
  // console.log(dateStr);
  // console.log(eventTitle);

  //

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  // const dailymealId = mealData?.dailymealId;
  // console.log(dailymealId);

  return (
    <div>
      <PostButton dailymealId={dailymealId} />
      <Calendar
        // style={{ maxWidth: "768px", width: "90%", backgroundColor: "white" }}
        views={["month"]}
        localizer={localizer}
        events={events}
        // startAccessor="start"
        // endAccessor="end"
        handleEventClick={handleEventClick}
        onSelectEvent={handleEventClick}
        components={{
          event: ({ event }) => (event ? <CustomDot /> : null),
          toolbar: customToolbar,
        }}
        eventPropGetter={(event, isSelected) => {
          const backgroundColor = "white";
          return { style: { backgroundColor } };
        }}
      />
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
    </div>
  );
};

export default CustomCalendar;

// const eventCreate = ({ date }) => {
//   const newEvent = {
//     id: events.length + 1,
//     start: date,
//     end: date,
//   };

//   handleAddEvent(newEvent);
// };

// const handleAddEvent = (newEvent) => {
//   setEvents([...events, newEvent]);
// };

// const [meals, setMeals] = useState([]);
