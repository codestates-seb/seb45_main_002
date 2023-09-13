import { styled } from "styled-components";
import GetFood from "./GetFood";
import {useEffect, useState} from "react";
import Button from "../../atom/button";

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

const EmptyMeal = ({label,onClick}) => {

  return (
    <DivEachMeal className={label} >
        <Button
            primary
            onClick={onClick}
            children={'끼니 추가하기'}
        />

    </DivEachMeal>
  );
};

export default EmptyMeal;
