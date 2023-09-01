import { styled } from "styled-components";

const SignUpContainer = styled.div`
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

const SignUpForm = () => {
  return (
    <>
      <SignUpContainer>
        {/* TEMP */}
        <input placeholder="이메일" />
        <input placeholder="비밀번호" />
        <input placeholder="닉네임" />
        <input placeholder="키" />
        <button>submit</button>
        {/* TEMP */}
      </SignUpContainer>
    </>
  );
};

export default SignUpForm;
