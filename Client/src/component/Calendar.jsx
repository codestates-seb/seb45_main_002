import { styled } from "styled-components";
import style from "../style/style";
import CustomCalendar from "./Calendar/Calendar";
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
  padding: 10px;
`;

const Calendar = ({ nowDate, setNowDate }) => {
  return (
    <StyleCalendar>
      <CustomCalendar nowDate={nowDate} setNowDate={setNowDate} />
    </StyleCalendar>
  );
};

export default Calendar;
