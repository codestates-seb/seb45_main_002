import { styled } from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* & div {
    display: flex;
    width: 100px
    height: 50px;
    border: 1px solid;
    margin-bottom:20px;
  } */

  & input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  & button {
    max-width: 60%;
    background-color: #4caf50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const LoginForm = () => {
  return (
    <>
      <LoginContainer>
        {/* TEMP */}
        <input placeholder="ID" />
        <input placeholder="PW" />
        <button>LOGIN</button>
        <button>OAUTH LOGIN</button>
        {/* TEMP */}
      </LoginContainer>
    </>
  );
};

export default LoginForm;
