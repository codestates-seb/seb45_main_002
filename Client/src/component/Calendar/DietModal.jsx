import Modal from "./Modal";
import { styled } from "styled-components";
import { useState } from "react";

const DietContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const DietContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const DietForm = (content) => {
  return (
    <>
      <DietContainer>
        <DietContent>
          {content}
          dietcontent 입니다
        </DietContent>
      </DietContainer>
    </>
  );
};

const DietModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(<div>content</div>);
  const [footer, setFooter] = useState(null);
  const [header, setHeader] = useState(null);

  return (
    <Modal
      isOpen={isOpen}
      content={content}
      header={"modal header"}
      footer={"modal footer"}
      setContent={<DietForm />}
      setHeader={setHeader}
      setFooter={setFooter}
      setIsOpen={setIsOpen}
    />
  );
};

export default DietModal;
