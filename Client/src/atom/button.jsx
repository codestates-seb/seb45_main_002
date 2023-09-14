import { css, styled } from "styled-components";

const ButtonStyle = styled.button`
  cursor: pointer;
  padding: 5px;
<<<<<<< HEAD
  width: ${(props) => (props.width ? props.width : "180px")};
  height: ${(props) => (props.height ? props.height : "48px")};
  border-radius: 8px;
  color: ${(props) => (props.fontColor ? props.fontColor : "#000000")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  ${(props) =>
    props.primary
      ? css`
          background-color: #ffc123;
          border: 0;
=======
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.size === "square"
      ? css`
          width: 60px;
          height: 60px;
        `
      : props.size === "fullwidth"
      ? css`
          width: 100%;
          height: 48px;
        `
      : props.size === "small"
      ? css`
          width: 148px;
          height: 32px;
        `
      : css`
          width: 180px;
          height: 48px;
        `};
  border-radius: 8px;
  color: #000000;
  font-size: 18px;
  ${(props) =>
    props.primary === true
      ? css`
          background-color: #ffc123;
          border: 0;
          &:active,
          &:hover,
          &:focus {
            background: #ffa24b;
          }
        `
      : props.primary === false
      ? css`
          background-color: #d9d9d9;
          border: 0;

          &:active,
          &:hover,
          &:focus {
            background: #898989;
          }
>>>>>>> devFE
        `
      : css`
          border: 2px solid #ffc123;
          background-color: #ffffff;
<<<<<<< HEAD
        `}
  &:active,
  &:hover,
  &:focus {
    background: #ffa24b;
  }
=======
          &:active,
          &:hover,
          &:focus {
            background: #ffc123;
          }
        `};
>>>>>>> devFE
  &:disabled {
    cursor: default;
    ${(props) =>
      props.primary
        ? css`
            background-color: #898989;
            color: white;
          `
        : css`
            border: 2px solid #898989;
            background-color: #ffffff;
            color: #898989;
          `}
  }
`;

<<<<<<< HEAD
const Button = ({
  children,
  func,
  disabled,
  primary,
  width,
  height,
  fontSize,
  fontColor,
}) => {
=======
const Button = ({ children, onClick, disabled, primary, size }) => {
>>>>>>> devFE
  return (
    <ButtonStyle
      disabled={disabled}
      primary={primary}
<<<<<<< HEAD
      width={width}
      height={height}
      fontSize={fontSize}
      fontColor={fontColor}
      onClick={func}
=======
      size={size}
      onClick={onClick}
>>>>>>> devFE
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
