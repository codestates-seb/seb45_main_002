import { css, styled } from "styled-components";

const ButtonStyle = styled.button`
  cursor: pointer;
  padding: 5px;
  ${(props) =>
    props.$size === "square"
      ? css`
          width: 60px;
          height: 60px;
        `
      : props.$size === "fullwidth"
      ? css`
          width: 100%;
          height: 48px;
        `
      : props.$size === "small"
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
    props.$primary === true
      ? css`
          background-color: #ffc123;
          border: 0;
          &:active,
          &:hover,
          &:focus {
            background: #ffa24b;
          }
        `
      : props.$primary === false
      ? css`
          background-color: #d9d9d9;
          border: 0;

          &:active,
          &:hover,
          &:focus {
            background: #898989;
          }
        `
      : css`
          border: 2px solid #ffc123;
          background-color: #ffffff;
          &:active,
          &:hover,
          &:focus {
            background: #ffc123;
          }
        `};
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

const Button = ({ children, onClick, disabled, primary, size }) => {
  return (
    <ButtonStyle
      disabled={disabled}
      $primary={primary}
      $size={size}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
