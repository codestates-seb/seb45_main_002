import { styled } from "styled-components";
import { useState } from "react";

import axios from "axios";

import Modal from "../atom/GlobalModal";
import ModalPortal from "../atom/ModalPortal";

import useZustand from "../zustand/Store";

const SearchFormContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 768px;
  width: 100%;
  height: 20px;
  /* border: 1px solid red; */
`;

const SearchInputContainer = styled.div`
  width: auto;
  height: auto;
`;

const SearchInput = styled.input`
  width: auto;
  height: auto;
`;

const ModalStyle = {
  color: "red",
};

const AlertAlert = styled.div`
  width: 500px;
  height: 500px;
`;

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [footer, setFooter] = useState(null);
  const [header, setHeader] = useState(null);

  const setArticles = useZustand.useArticles(state=>state.setArticles)

  const handleOpenWarningModal = () => {
    setIsOpen(true);
    setHeader(<AlertAlert>"ALERTALERTALERTALERT "</AlertAlert>);
    setFooter("ALERTALERTALERTALERT");
    setContent("검색어를 입력해주세요!");
  };

  const handleSearch = () => {
    const matches = searchTerm.match(/[가-힣A-Za-z0-9]+/g);
    if (!matches) {
      handleOpenWarningModal();
    } else {
      axios.get("http://43.201.194.176:8080/community/title-search?keyword="+matches.join("")+"&page=1&size=10")
      .then(res=>setArticles(res.data.data))
      .catch(err=>console.log(err))
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchFormContainer>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Enter로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </SearchInputContainer>
      <ModalPortal>
        <Modal
          isOpen={isOpen}
          content={content}
          header={header}
          footer={footer}
          setContent={setContent}
          setHeader={setHeader}
          setFooter={setFooter}
          setIsOpen={setIsOpen}
          ModalStyle={ModalStyle}
        />
      </ModalPortal>
    </SearchFormContainer>
  );
};

export default SearchForm;
