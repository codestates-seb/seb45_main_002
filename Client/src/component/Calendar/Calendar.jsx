import { styled } from "styled-components";
import React, { useState, useEffect, Children } from "react";
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
// import AnalizedDiet from "../diet/DietAnalyze";
// import { postCalendarData, PostButton, PostAnalyze } from "./PostMealBtn";
import { useNavigate } from "react-router-dom";

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

const CustomCalendar = ({ nowDate, setNowDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);
  const [dailymealId, setDailymealId] = useState(null);
  const navigate = useNavigate();
  // const [mealData, setMealData] = useState(null);
  const [events, setEvents] = useState([
    {
      title: "eventTitle",
      start: "",
      end: "",
    },
  ]);

  useEffect(() => {
    const fetchedMeals = async () => {
      // const token = localStorage.getItem("Authorization");
      console.log(localStorage.getItem("Authorization"));

      try {
        const response = await axios.get(
          "http://43.201.194.176:8080/dailymeals/date?page=1&size=5",
          {
            headers: { Authorization: localStorage.getItem("Authorization") },
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
    console.log("handleEventClick");
    const startDate = new Date(event.start);
    startDate.setDate(startDate.getDate() + 1);
    const dateStr = startDate.toISOString().split("T")[0];
    setNowDate(dateStr);
  };
  // console.log(dateStr);
  // console.log(eventTitle);

  const onSelectSlot = (event) => {
    console.log("onSelectSlot");
    const startDate = new Date(event.start);
    startDate.setDate(startDate.getDate() + 1);
    const dateStr = startDate.toISOString().split("T")[0];
    setNowDate(dateStr);
  };

  //

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  // const dailymealId = mealData?.dailymealId;
  // console.log(dailymealId);

  const DateCellWrapper = (props, selected) => {
    const { children, value } = props;
    const isSelected =
      new Date(value).valueOf() === new Date(selected).valueOf();

    return React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor: isSelected ? "#FFC123" : "#FFFFFF",
      },
    });
  };

  return (
    <div>
      {/* <AnalizedDiet dailymealId={dailymealId} /> */}
      <Calendar
        // style={{ maxWidth: "768px", width: "90%", backgroundColor: "white" }}

        selectable={true}
        views={["month"]}
        localizer={localizer}
        events={events}
        // startAccessor="start"
        // endAccessor="end"
        handleEventClick={handleEventClick}
        onSelectEvent={handleEventClick}
        onSelectSlot={onSelectSlot}
        components={{
          event: ({ event }) => (event ? <CustomDot /> : null),
          toolbar: customToolbar,
          dateCellWrapper: DateCellWrapper,
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
