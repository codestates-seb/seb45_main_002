import axios from "axios";

const GetFoodKeyword = async (value) => {
  const token = localStorage.getItem("access_token");

  return axios
    .get(`http://43.201.194.176:8080/search/foods?search-word=${value}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export default GetFoodKeyword;
