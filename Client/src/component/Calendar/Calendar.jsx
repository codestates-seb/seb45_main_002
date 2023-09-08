import { styled } from "styled-components";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "../../atom/GlobalModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import StyledCalendar from "../style/CalendarStyle";
import "moment/locale/ko";

const CalendarContainer = styled.div`
  max-width: 768px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
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
  const goToToday = () => {
    toolbar.date.set(new Date());
    toolbar.onNavigate("TODAY");
  };

  const goToPrev = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToToday}>
          오늘
        </button>
      </span>
      <span className="rbc-btn-group">
        <button type="button" onClick={goToPrev}>
          &lt; 이전 달
        </button>
        <button type="button" onClick={goToNext}>
          다음 달&gt;
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    </div>
  );
};

const eachMeal = [
  "아침: 계란후라이, 토스트",
  "점심: 김밥",
  "저녁: 된장찌개, 밥",
];

const eventData = [
  {
    start: new Date(2023, 8, 15),
    end: new Date(2023, 8, 15),
    hasDiet: true,
    dietInfo: eachMeal,
  },
];

const CustomCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);

  const handleDateClick = (date, event) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const selectedEvents = eventData.filter((event) => {
      const start = moment(event.start).format("YYYY-MM-DD");
      const end = moment(event.end).format("YYYY-MM-DD");
      return start === formattedDate || end === formattedDate;
    });

    if (!selectedEvents.length === 0) {
      const content = (
        <div>
          <h2>선택한 날짜의 식단</h2>
          <ul>
            {selectedEvents.map((event, index) => (
              <li key={index}>{event.dietInfo}</li>
            ))}
          </ul>
        </div>
      );
      setModalContent(content);
      setIsModalOpen(true);
    }
  };

  const handleDotClick = (event) => {
    if (event.hasDiet) {
      setModalHeader(<h2>식단 정보</h2>);
      setModalContent(<div>{event.dietInfo}</div>);
      setIsModalOpen(true);
    }
  };

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  moment().format("YYYY-MM-DD HH:mm:ss");

  return (
    <CalendarContainer>
      <Calendar
        views={["month"]}
        localizer={localizer}
        events={eventData}
        startAccessor="start"
        endAccessor="end"
        handleEventClick={handleDotClick}
        onSelectEvent={handleDotClick}
        components={{
          event: ({ event }) => (event.hasDiet ? <CustomDot /> : null),
          toolbar: customToolbar,
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
    </CalendarContainer>
  );
};
export default CustomCalendar;
