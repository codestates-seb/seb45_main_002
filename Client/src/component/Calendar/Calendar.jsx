import { styled } from "styled-components";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "../../atom/GlobalModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import StyledCalendar from "../style/CalendarStyle";
import "moment/locale/ko";
import axios from "axios";
import GetDailyDiet from "../diet/GetDailyDiet";
import useZustand from "../../zustand/Store";

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
  const accessToken = useZustand.useToken((state) => state.accessToken);
  const refreshToken = useZustand.useToken((state) => state.refreshToken);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);
  const [events, setEvents] = useState([
    {
      title: "eventTItle",
      start: new Date(2023, 8, 18),
      end: new Date(2023, 8, 18),
    },
  ]);

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchedMeals = async () => {
      try {
        const response = await axios.get(
          "http://43.201.194.176:8080/dailymeals/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMeals(response.data);
      } catch (error) {
        // console.error("fetch error meals:", error);
      }
    };
    fetchedMeals();
  }, [accessToken]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const eventCreate = ({ date }) => {
    const newEvent = {
      id: events.length + 1,
      start: date,
      end: date,
    };

    handleAddEvent(newEvent);
  };

  const handleEventClick = (event) => {
    const eventTitle = event.title;
    const dateStr = event.start.toISOString().split("T")[0];
    // console.log(dateStr);
    // console.log(eventTitle);
    // const mealData = {
    //   dailyMealId: 13,
    //   memberId: 1,
    //   date: "2023-09-10",
    //   name: "name",
    //   favorite: false,
    //   eachMeals: ["밥,고기,김치"],
    //   totalDailyKcal: 51.0,
    //   totalDailyCarbo: 7.0,
    //   totalDailyProtein: 1.0,
    //   totalDailyFat: 2.0,
    // };
    //

    const fetchData = async () => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://43.201.194.176:8080/dailymeals/${dateStr}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, // 토큰이 필요한 경우 추가
              },
            }
          );
          const mealData = response.data;
          setModalHeader(<h2>{eventTitle}</h2>);
          setModalContent(
            <div>
              <h3>식단 정보</h3>
              <p>메뉴: {mealData.eachMeals}</p>
              <p>총 칼로리: {mealData.totalDailyKcal}</p>
            </div>
          );
          setIsModalOpen(true);
        } catch (error) {
          // console.error("Error fetching meal:", error);
        }
      };
      fetchData();
    };
  };

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  return (
    <div>
      <Calendar
        events={events}
        localizer={localizer}
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

//   const getIndividualDiet = (dailyMealId) => {
//     const individualDietData = {
//       dailyMealId: dailyMealId,
//       memberId: 1,
//       date: "2023-09-10",
//       name: "name",
//       favorite: false,
//       eachMeals: ["밥", "김치찌개", "고기"],
//       totalDailyKcal: 51.0,
//       totalDailyCarbo: 7.0,
//       totalDailyProtein: 1.0,
//       totalDailyFat: 2.0,
//     };

//     return Promise.resolve(individualDietData);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://43.201.194.176:8080/dailymeals",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         const modifiedData = await Promise.all(
//           response.data.map(async (item) => {
//             const [year, month, day] = item.date.split("-");
//             const startDate = new Date(year, month - 1, day);
//             const endDate = new Date(year, month - 1, day);

//             const eachMealsArray = await Promise.all(
//               item.eachMeals.map(async (meal) => {
//                 const individualDietData = await getIndividualDiet(
//                   meal.dailyMealId
//                 );
//                 return individualDietData.eachMeals;
//               })
//             );

//             return {
//               start: startDate,
//               end: endDate,
//               dailyMealId: item.dailyMealId,
//               date: item.date,
//               name: item.name,
//               favorite: item.favorite,
//               totalDailyKcal: item.totalDailyKcal,
//               totalDailyCarbo: item.totalDailyCarbo,
//               totalDailyProtein: item.totalDailyProtein,
//               totalDailyFat: item.totalDailyFat,
//               eachMeals: eachMealsArray,
//             };
//           })
//         );

//         setEventData(modifiedData);
//       } catch (error) {
//         console.error("fetch error:", error);
//       }
//     };

//     fetchData();
//   }, [accessToken]);

//   const handleDotClick = (event) => {
//     console.log(event);
//     const dailyMealId = event.dailyMealId;

//     getIndividualDiet(dailyMealId).then((individualDietData) => {
//       setModalHeader(<h2>이 날 식단</h2>);
//       setModalContent(
//         <div>
//           <ul>
//             {individualDietData.eachMeals.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       );
//       setIsModalOpen(true);
//     });
//   };

//   moment.locale("ko-KR");
//   const localizer = momentLocalizer(moment);

//   return (
//     <div>
//       <Calendar
//         style={{ maxWidth: "768px", width: "90%", backgroundColor: "white" }}
//         views={["month"]}
//         localizer={localizer}
//         events={eventData}
//         startAccessor="start"
//         endAccessor="end"
//         handleEventClick={handleDotClick}
//         onSelectEvent={handleDotClick}
//         components={{
//           // event: ({ event }) =>
//           //   event.item.totalDailyKcal > 0 ? <CustomDot /> : null,
//           toolbar: customToolbar,
//         }}
//         eventPropGetter={(event, isSelected) => {
//           const backgroundColor = "white";
//           return { style: { backgroundColor } };
//         }}
//       />
//       <Modal
//         isOpen={isModalOpen}
//         content={modalContent}
//         header={modalHeader}
//         footer={modalFooter}
//         setIsOpen={setIsModalOpen}
//         setContent={setModalContent}
//         setHeader={setModalHeader}
//         setFooter={setModalFooter}
//       />
//     </div>
//   );
// };

// export default CustomCalendar;

// const eventData = [
//   {
//     start: new Date(2023, 8, 15),
//     end: new Date(2023, 8, 15),
//     hasDiet: true,
//     dietInfo: {
//       dailyMealId: 1,
//       memberId: 4,
//       date: "2023-09-05",
//       name: "식단명",
//       favorite: false,
//       eachMeals: [
//         "아침: 계란후라이, 토스트",
//         "점심: 김밥",
//         "저녁: 된장찌개, 밥",
//       ],
//       totalDailyKcal: 1000,
//       totalDailyCarbo: 500,
//       totalDailyProtein: 500,
//       totalDailyFat: 500,
//     },
//   },
// ];

//   const [eventData, setEventData] = useState([
//     {
//       start: new Date(2023, 8, 18),
//       end: new Date(2023, 8, 18),
//       dailyMealId: 1,
//       date: "2023-09-18",
//       name: "name",
//       favorite: true,
//       totalDailyKcal: 111.0,
//       totalDailyCarbo: 0.0,
//       totalDailyProtein: 0.0,
//       totalDailyFat: 0.0,
//     },
//   ]);

//

//   useEffect(() => {
//     const mockData = [
//       {
//         start: "123",
//         end: "",
//         dailyMealId: 1,
//         date: "2023-09-15",
//         name: "name",
//         favorite: true,
//         totalDailyKcal: 222.0,
//         totalDailyCarbo: 0.0,
//         totalDailyProtein: 0.0,
//         totalDailyFat: 0.0,
//       },
//     ];

//     const modifiedData = mockData.map((item) => {
//       const [year, month, day] = item.date.split("-");
//       const startDate = new Date(year, month - 1, day);
//       const endDate = new Date(year, month - 1, day);
//       return {
//         end: endDate,
//         start: startDate,
//         name: item.name,
//         totalDailyKcal: item.totalDailyKcal,
//       };
//     });
//     setEventData((prevData) => [...prevData, ...modifiedData]);
//   }, []);

//   const mockDailyDietData = {
//     dailyMealId: 13,
//     memberId: 1,
//     date: "2023-09-15",
//     favorite: false,
//     eachMeals: [
//       {
//         eachMealId: 1,
//         timeSlots: 1,
//         favorite: false,
//         quantityfoods: [],
//         totalEachKcal: 51.0,
//         totalEachCarbo: 7.0,
//         totalEachProtein: 1.0,
//         totalEachFat: 2.0,
//         name: "식사1",
//       },
//       {
//         eachMealId: 2,
//         timeSlots: 2,
//         favorite: false,
//         quantityfoods: [],
//         totalEachKcal: 80.0,
//         totalEachCarbo: 10.0,
//         totalEachProtein: 2.0,
//         totalEachFat: 3.0,
//         name: "식사2",
//       },
//     ],
//     totalDailyKcal: 131.0,
//     totalDailyCarbo: 17.0,
//     totalDailyProtein: 3.0,
//     totalDailyFat: 5.0,
//   };

//   const handleDateClick = (date, event) => {
//     const formattedDate = moment(date).format("YYYY-MM-DD");
//     const selectedEvents = eventData.filter((event) => {
//       const start = moment(event.start).format("YYYY-MM-DD");
//       const end = moment(event.end).format("YYYY-MM-DD");
//       return start === formattedDate || end === formattedDate;
//     });
//     if (selectedEvents.length === 0) {
//       const content = (
//         <div>
//           <ul>
//             {selectedEvents.map((event, index) => (
//               <li key={index}>{event.eachMeals}</li>
//             ))}
//           </ul>
//         </div>
//       );
//       setModalContent(content);
//       setIsModalOpen(true);
//     }
//   };

//   const handleDotClick = (event) => {
//     if (event.hasDiet) {
//       setModalHeader(<h2>이 날 식단</h2>);
//       setModalContent(<div>{event.eachMeals}</div>);
//       setIsModalOpen(true);
//     }
//   };

//   moment.locale("ko-KR");
//   const localizer = momentLocalizer(moment);

//   return (
//     <div>
//       <Calendar
//         style={{ maxWidth: "768px", width: "90%", backgroundColor: "white" }}
//         views={["month"]}
//         localizer={localizer}
//         events={eventData}
//         startAccessor="start"
//         endAccessor="end"
//         handleEventClick={handleDotClick}
//         onSelectSlot={handleDotClick}
//         components={{
//           event: ({ event }) =>
//             event.totalDailyKcal > 0 ? <CustomDot /> : null,
//           toolbar: customToolbar,
//         }}
//         eventPropGetter={(event, isSelected) => {
//           const backgroundColor = "white";
//           return { style: { backgroundColor } };
//         }}
//       />
//       <Modal
//         isOpen={isModalOpen}
//         content={modalContent}
//         header={modalHeader}
//         footer={modalFooter}
//         setIsOpen={setIsModalOpen}
//         setContent={setModalContent}
//         setHeader={setModalHeader}
//         setFooter={setModalFooter}
//       />
//     </div>
//   );

// //
// //
// //
// //
// //
// //
// // useEffect(() => {
// //   axios
// //     .get("http://43.201.194.176:8080/dailymeals", {
// //       params: {
// //         date: eventData.date,
// //       },
// //     })
// //     .then((response) => {
// //       const modifiedData = response.data.map((item) => {
// //         const [year, month, day] = item.date.split("-");
// //         const startDate = new Date(year, month - 1, day);
// //         const endDate = new Date(year, month - 1, day);
// //         const eachMealsArray = item.eachMeals.map((meal) => meal.eachMeal);
// //         return {
// //           start: startDate,
// //           end: endDate,
// //           hasDiet: true,
// //           dietInfo: item.eachMeals,
// //         };
// //       });
// //       console.log(eventData.date);
// //     })
// //     .catch((error) => {
// //       console.error("fetch error:", error);
// //     });
// // }, []);

// // const handleDateClick = (date, event) => {
// //   const formattedDate = moment(date).format("YYYY,MM,DD");
// //   const selectedEvents = eventData.filter((event) => {
// //     const start = moment(event.start).format("YYYY,MM,DD");
// //     const end = moment(event.end).format("YYYY,MM,DD");
// //     return start === formattedDate || end === formattedDate;
// //   });
// //   if (selectedEvents.length === 0) {
// //     GetDailyDiet(eventData.date);
// //     const content = (
// //       <div>
// //         <ul>
// //           {selectedEvents.map((event, index) => (
// //             <li key={index}>{event.eachMeals}</li>
// //           ))}
// //         </ul>
// //       </div>
// //     );
// //     setModalContent(content);
// //     setIsModalOpen(true);
// //   }
// // };

// // console.log(event);
// // if (event) {
// //   const date = event.start.toISOString().split("T")[0];
// //   const data = event.eachMeals;

// //   if (data) {
// //     console.log(data.eachMeals);
// //     setModalHeader(<h2>이 날 식단</h2>);
// //     setModalContent(
// //       <div>
// //         <ul>
// //           {data.eachMeals.map((item) => (
// //             <li key={item.eachMealId}>{item.name}</li>
// //           ))}
// //         </ul>
// //       </div>
// //     );
// //     setIsModalOpen(true);
// //   }
// // }
