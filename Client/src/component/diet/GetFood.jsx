import axios from "axios";
import { useState } from "react";

const GetFood = (foodId) => {
  const [food, setFood] = useState();
  const token = "";
  axios
    .get(`http://43.201.194.176:8080/foods/${foodId}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      // 성공한 경우 실행
      console.log(response);
      setFood(() => {
        return response.data;
      });
    })
    .catch((error) => {
      // 에러인 경우 실행
      console.log(error);
    });
  return food;
};
export default GetFood;
