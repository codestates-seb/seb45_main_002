import { useState } from "react";
import Button from "../../atom/button";
import { postFavoriteDailyMeal } from "../../util/FavoriteDaily";
import { styled } from "styled-components";

const DivFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  & > p {
    font-size: 12px;
  }

  & > input {
    width: 148px;
    height: 32px;
    border-radius: 8px;
    padding: 5px;
  }
`;

const InputAddFavorite = ({ meal, setIsModal, defaultResult = false }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(defaultResult);

  const OnClickHandler = () => {
    postFavoriteDailyMeal(meal.eachMeals, input);
    setResult(true);
  };
  return result ? (
    <DivFormStyle>
      <p>완료되었습니다.</p>
      <Button
        size={"small"}
        onClick={() => {
          setIsModal(false);
        }}
      >
        닫기
      </Button>
    </DivFormStyle>
  ) : (
    <DivFormStyle>
      <p>저장할 식단의 이름을 입력해주세요</p>
      <input value={input} onInput={(event) => setInput(event.target.value)} />
      <Button primary={true} size={"small"} onClick={OnClickHandler}>
        선호 식단 저장
      </Button>
    </DivFormStyle>
  );
};

export default InputAddFavorite;
