import { styled } from "styled-components";
import GetFood from "./GetFood";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

const DivEachMeal = styled.div`
  margin: 13px;
  background-color: #ffffaa;
  padding: 13px;
  border-radius: 10px;
`;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const Food = styled.div`
  display: flex;
  gap:10px;
  margin-bottom: 8px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap:5px;
  margin-top: 10px;
`;

const EachMeal = ({label, eachmeal,isChecked,onClick}) => {

    const [keyword,setKeyword] = useState('');

    // foods [] post, response 받으면 여기에 바로 보여준다.

  return (
    <DivEachMeal className={label} onClick={onClick}>
        <Title>{label}</Title>
      {(eachmeal.foods ?? []).map((eachmealfood) => {
        return (
          <Food>
            <p>{eachmealfood.foodName}</p>
            <p>{eachmealfood.quantity}인분</p>
          </Food>
        );
      })}
      <h4>총 영양소</h4>
        <GridBox>
            <p>칼로리: {(eachmeal.totalEachKcal??0).toLocaleString()}kcal</p>
            <p>탄수화물: {(eachmeal.totalEachCarbo??0).toLocaleString()}g</p>
            <p>단백질: {(eachmeal.totalEachProtein??0).toLocaleString()}g</p>
            <p>지방: {(eachmeal.totalEachFat??0).toLocaleString()}g</p>
        </GridBox>
        {isChecked ?
            <input
                placeholder="검색할 음식의 이름을 입력하세요"
                onInput={(e) => setKeyword(e.target.value)}
                value={keyword}
            />
            : null}
    </DivEachMeal>
  );
};

export default EachMeal;
