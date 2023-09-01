import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

const ModalContainer = styled.div`
  z-index: 9999;
  background-color: transparent;
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBtn = styled.button`
  background-color: orange;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
  color: black;

  & span {
    font-size: 15px;
  }

  & nth-child {
    margin: 20px;
  }
`;

const Modal = ({ isOpen, onClose, content, header, footer }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContainer $isOpen={isOpen}>
      <ModalBackdrop onClick={handleBackdropClick}>
        <ContentContainer>
          {header}
          {content}
          {footer}
          <span>닫으려면 창 밖을 눌러주세요</span>
        </ContentContainer>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default Modal;
