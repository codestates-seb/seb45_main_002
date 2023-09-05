import { styled } from "styled-components";
import style from "../style/style";

const StyleCalendar = styled.div`
  width: calc(100% - 16px);
  max-width: 340px;
  height: 280px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${style.color.white};
  border-radius: 8px;
`;

const Calendar = () => {
  return <StyleCalendar></StyleCalendar>;
};

export default Calendar;
