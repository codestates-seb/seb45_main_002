import { styled } from "styled-components";
import axios from "axios";
const Dailymealbtn = styled.button`
  width: 20px;
  height: 20px;
  background-color: red;
  margin-right: 10px; /* 예시로 간격 추가 */
`;

const postCalendarData = async () => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      "http://43.201.194.176:8080/dailymeals",
      {
        date: "2023-09-22",
        name: "name",
        favorite: false,
        eachMeals: [11, 22, 33],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Calendar Data Posted:", response.data);
  } catch (error) {
    console.error("Error posting calendar data:", error);
  }
};

const PostButton = ({ postCalendarData }) => {
  return (
    <Dailymealbtn onClick={postCalendarData}>Post Calendar Data</Dailymealbtn>
  );
};

export { postCalendarData, PostButton };
