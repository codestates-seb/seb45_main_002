import { styled } from "styled-components";

const StyleCalendar = styled.div`
  width: calc(50% - 16px);
  max-width: 584px;
  aspect-ratio: 0.9;
  background-color: #e6e6e6;
`;

const Calendar = () => {
  return <StyleCalendar></StyleCalendar>;
};

export default Calendar;
