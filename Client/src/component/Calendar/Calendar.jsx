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
        <button type="button" onClick={goToPrev}>
          &lt; 이전 달
        </button>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <button type="button" onClick={goToNext}>
          다음 달&gt;
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

  const [events, setEvents] = useState([
    {
      title: "eventTItle",
      start: new Date(2023, 8, 12),
      end: new Date(2023, 8, 12),
    },
  ]);

  const [meals, setMeals] = useState([]);
  const token = localStorage.getItem("access_token");
  const eventCreate = ({ date }) => {
    const newEvent = {
      id: events.length + 1,
      start: date,
      end: date,
    };

    handleAddEvent(newEvent);
  };

  useEffect(() => {
    const fetchedMeals = async () => {
      try {
        const response = await axios.get(
          "http://43.201.194.176:8080/dailymeals/date?page=2&size=5",
          {
            headers: { Authorization: token },
          }
        );
        const mealData = response.data;
        const newEvents = mealData.map((meal) => ({
          id: meal.dailyMealId,
          title: meal.name,
          start: new Date(meal.date.toISOString().split("T")[0]),
          end: new Date(meal.date.toISOString().split("T")[0]),
        }));
        setEvents([...events, ...newEvents]);
      } catch (error) {
        console.error("fetch error meals:", error);
      }
    };
    fetchedMeals();
  }, [token]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventClick = (event) => {
    const eventTitle = event.title;
    const dateStr = event.start;

    // const fetchDailymeal = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://43.201.194.176:8080/dailymeals/date/${dateStr}`,
    //       {
    //         headers: {
    //           Authorization: token,
    //         },
    //       }
    //     );
    // const mealData = response.data;
    const mealData = {
      dailyMealId: 13,
      memberId: 1,
      date: "2023-09-15",
      name: "name",
      favorite: false,
      eachMeals: ["밥,고기,김치"],
      totalDailyKcal: 51.0,
      totalDailyCarbo: 7.0,
      totalDailyProtein: 1.0,
      totalDailyFat: 2.0,
    };
    setModalHeader(<h2>{eventTitle}</h2>);
    setModalContent(
      <div>
        <h3>식단 정보</h3>
        <p>메뉴: {mealData.eachMeals}</p>
        <p>총 칼로리: {mealData.totalDailyKcal}</p>
      </div>
    );
    setIsModalOpen(true);
    // } catch (error) {
    //   console.error("Error fetching meal:", error);
    // }
  };

  // console.log(dateStr);
  // console.log(eventTitle);

  //

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  return (
    <div>
      <PostButton postCalendarData={postCalendarData} />
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
