import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  z-index: 9999;
  background-color: transparent;
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalBackdrop = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(4px);
`;

export const ModalBtn = styled.button`
  background-color: orange;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 10px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 13px;
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 13px;
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
  font-size: 16px;

  & span {
    padding: 10px;
    font-size: 6px;
    color: #dadada;
  }

  & nth-child {
    margin: 20px;
  }
`;

const Modal = ({
  isOpen,
  content,
  header,
  footer,
  setIsOpen,
  setContent,
  setHeader,
  setFooter,
  style,
}) => {
  const handleCloseModal = () => {
    setContent(null);
    setHeader(null);
    setFooter(null);
    setIsOpen(false);
  };

  return (
    <ModalContainer $isOpen={isOpen}>
      <ModalBackdrop onClick={handleCloseModal}>
        <ContentContainer
          onClick={(e) => e.stopPropagation()}
          style={{ ...style }}
        >
          <HeaderContainer>{header}</HeaderContainer>
          {content}
          <FooterContainer>{footer}</FooterContainer>
          <span>닫으려면 창 밖을 눌러주세요</span>
        </ContentContainer>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default Modal;
