import { useEffect } from "react";
import { styled } from "styled-components";

import style from "../style/style";

const FavoriteDietList = styled.li`
  margin: ${style.layout.narrowMargin.height} 0;
  cursor: pointer;
  &>*{
    margin: 0 ${style.layout.narrowMargin.width};
  }
  &>:first-child{
    display: inline-block;
    width: 35%;
    font-weight: bold;
  }
`

function FavoriteDiet({favorite,dietData,setDietData,openModal,setOpenModal,loadDietInFavorite}){ 
  function putData(){
    setDietData(favorite)
  }

  useEffect(()=>putData(),[dietData])

  function load(){
    setOpenModal(!openModal)
    loadDietInFavorite()
  }
console.log(dietData)
  return(
    <FavoriteDietList onClick={load}>
        <span>{favorite.name}</span>
        <span>{favorite.totalDailyKcal} kcal</span>
        <span>{favorite.totalDailyProtein} g</span>
        <span>{favorite.totalDailyCarbo} g</span>
        <span>{favorite.totalDailyFat} g</span>
    </FavoriteDietList>
  )
}
export default  FavoriteDiet;