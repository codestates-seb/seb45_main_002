import { styled } from "styled-components";
import Button from "../../atom/button";
import { useNavigate } from "react-router-dom";
import { deleteDailyMealId } from "../../util/Diet";

const DivDeleteModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    width: 80px;
  }

  & > div {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
`;
const DeleteModal = ({ dailyMealId, setIsModal }) => {
  const navigate = useNavigate();
  const deleteOnClickHandler = () => {
    deleteDailyMealId(dailyMealId);
    navigate("/");
  };

  return (
    <DivDeleteModalStyle>
      <p>정말 삭제하시겠습니까?</p>
      <p>단, 커뮤니티 게시글으로 작성된 식단은 삭제할 수 없습니다.</p>
      <div>
        <Button
          size={"small"}
          onClick={() => {
            setIsModal(false);
          }}
        >
          취소
        </Button>
        <Button primary={true} size={"small"} onClick={deleteOnClickHandler}>
          삭제
        </Button>
      </div>
    </DivDeleteModalStyle>
  );
};

export default DeleteModal;
