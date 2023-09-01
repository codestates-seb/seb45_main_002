import { css, styled } from "styled-components";

const ButtonStyle = styled.button`
  cursor: pointer;
  padding: 5px;
  width: ${(props) => (props.width ? props.width : "180px")};
  height: ${(props) => (props.height ? props.height : "48px")};
  border-radius: 8px;
  color: #000000;

  ${(props) =>
    props.primary
      ? css`
          background-color: #ffc123;
          border: 0;
        `
      : css`
          border: 2px solid #ffc123;
          background-color: #ffffff;
        `}

  &:active,
  &:hover,
  &:focus {
    background: #ffa24b;
  }

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

const Button = ({ children, primary, disabled, width, height }) => {
  return (
    <ButtonStyle
      disabled={disabled}
      primary={primary}
      width={width}
      height={height}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
