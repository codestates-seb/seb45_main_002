import { useState } from "react";
import Button from "../../atom/button";
import { styled } from "styled-components";

const StyleFood = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 2px solid #ffc123;
  border-top: 0;
  padding: 10px;
  font-size: 14px;

  & input {
    width: 40px;
  }

  & > p:first-child {
    width: calc(100% - 20px - 80px);
  }
`;

const IsEachFood = ({ item, index }) => {
  console.log(item);
  const [quantity, setQuantity] = useState(item.quantity);

  const changeQuantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const deleteOnClickHandler = () => {};

  return (
    <StyleFood>
      <p>{item.foodName}</p>
      <p>
        <input
          type="number"
          value={quantity}
          onChange={changeQuantityHandler}
        />
        인분
      </p>
      <Button
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
        }}
        onClick={deleteOnClickHandler}
      >
        ❌
      </Button>
    </StyleFood>
  );
};

export default IsEachFood;
