import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import GetDailyDiet from "../component/diet/GetDailyDiet";
import EachMeal from "../component/diet/EachMeal";
import GetFoodKeyword from "../component/diet/GetFoodKeyword";
import Button from "../atom/button";
import EmptyMeal from "../component/diet/EmptyMeal";

const StyleDiet = styled.div`
  background-color: #d9d9d9;
`;

const dummyMeal = {
  eachMeals:[
  //     {
  //   memberId: 1,
  //   dailymealId: 12,
  //   timeSlots: 1,
  //   foods: [
  //     {
  //       foodId: 5,
  //       brand: "전국(대표)",
  //       foodName: "더덕구이",
  //       foodCategory1: "구이류",
  //       foodCategory2: "채소류구이",
  //       servingSize: 100,
  //       quantity: 1.0,
  //       ratioEachKcal: 184.0,
  //       ratioEachCarbo: 31.0,
  //       ratioEachProtein: 3.0,
  //       ratioEachFat: 5.0
  //     }
  //   ],
  //   totalEachKcal: 1000,
  //   totalEachCarbo: 50,
  //   totalEachProtein: 50,
  //   totalEachFat: 50
  // },{
  //   memberId: 1,
  //   dailymealId: 13,
  //   timeSlots: 2,
  //   foods: [
  //     {
  //       foodId: 5,
  //       brand: "전국(대표)",
  //       foodName: "더덕구이",
  //       foodCategory1: "구이류",
  //       foodCategory2: "채소류구이",
  //       servingSize: 100,
  //       quantity: 1.7,
  //       ratioEachKcal: 184.0,
  //       ratioEachCarbo: 31.0,
  //       ratioEachProtein: 3.0,
  //       ratioEachFat: 5.0
  //     }
  //   ],
  //   totalEachKcal: 1000,
  //   totalEachCarbo: 50,
  //   totalEachProtein: 50,
  //   totalEachFat: 50
  // },{
  //   memberId: 1,
  //   dailymealId: 14,
  //   timeSlots: 3,
  //   foods: [],
  //   totalEachKcal: 1000,
  //   totalEachCarbo: 50,
  //   totalEachProtein: 50,
  //   totalEachFat: 50
  // }
  ]
}

function Diet() {
  const { date } = useParams();
  // const getmeal = GetDailyDiet(date);
// useForm 호출
  //
  const [meal, setMeal] = useState([]);

  // useEffect(() => {
  //   setMeal(() => getmeal);
  // }, [getmeal, date]);

  const [inputSearchFood, setInputSearchFood] = useState("");
  const [searchFoodList, setSearchFoodList] = useState([]);
  const [selectedTimeSlots,setSelectedTimeSlots] = useState(0);
  // useEffect(() => {
  //   if (inputSearchFood) {
  //     const funcasync = async () => {
  //       const result = await GetFoodKeyword(inputSearchFood);
  //       await setSearchFoodList(() => result);
  //     };
  //     funcasync();
  //   } else {
  //     setSearchFoodList(() => []);
  //   }
  // }, [inputSearchFood]);

  useEffect(()=> {
    setMeal(dummyMeal.eachMeals ?? []);
  },[]);

  // 끼니 추가하기 -> 아침, 점심, 저녁 추가하기 버튼 3개로 바뀌어야함
  // 추가를 함과 동시에 아침 = 1, 점심 = 2, 저녁=3,
  // timeslots: 1 or 2 or 3, foods: [];
  // 서버쪽에서 응답 => timeslots:1, foods:[], eachmealId:1
  // eachmealId:[]

    return (
      <StyleDiet>
        <div className="breakfast"></div>
        <div className="lunch"></div>
        <div className="dinner"></div>
        {meal.map((eachmeal, index) => {
            return (
              <EachMeal
                key={index}
                label={
                  eachmeal.timeSlots === 1
                    ? "아침식사"
                    : eachmeal.timeSlots === 2
                    ? "점심식사"
                    : eachmeal.timeSlots === 3
                    ? "저녁식사"
                    : ""
                }
                isChecked={selectedTimeSlots === eachmeal.timeSlots}
                onClick={()=> setSelectedTimeSlots(eachmeal?.timeSlots )}
                eachmeal={eachmeal}
              />
            );
          })
}
        {dummyMeal.eachMeals.length < 3 ?
            <EmptyMeal
            onClick={()=> setMeal(prevState => [...prevState, {
                timeSlots: prevState.length + 1,
            }])}
            />
            :null}
        <div>
          <input
            placeholder="검색할 음식의 이름을 입력하세요"
            onInput={(e) => setInputSearchFood(e.target.value)}
            value={inputSearchFood}
          />
          <ul>
            {Array.isArray(searchFoodList) ? (
              searchFoodList.map((item, index) => (
                <li key={index}>
                  <p>
                    {item.foodName}: {item.kcal}kcal
                  </p>
                  {/* <button onClick={() => AddFoodHandler(item.foodName, item.kcal)}>
              +
            </button> */}
                </li>
              ))
            ) : (
              <>Err</>
            )}
          </ul>
        </div>
        <div>
          <h3>하루 섭취량</h3>
          <p>칼로리: {meal?.totalDailyKcal?? ''}</p>
          <p>탄수화물: {meal?.totalDailyCarbo?? ''}</p>
          <p>단백질: {meal?.totalDailyProtein?? ''}</p>
          <p>지방: {meal?.totalDailyFat?? ''}</p>
        </div>
        <div style={{
          display:"flex",
          alignItems:'center',
          justifyContent:'center',
          gap:10
        }}>
          <Button
              onClick={()=> console.log(1)}
              children={'나가기'}
          />
          <Button
              primary
              onClick={()=> console.log(1)}
              children={'제출하기'}
          />
        </div>

      </StyleDiet>
    );
}

export default Diet;
