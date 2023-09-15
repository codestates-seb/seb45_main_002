import { useEffect, useRef, useState } from "react";
import { getFavoriteDailyMeal } from "../../util/FavoriteDaily";
import FavoriteDailyItem from "./FavoriteDailyItem";
import { styled } from "styled-components";
import Button from "../../atom/button";

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  @media (max-width: 450px) {
    justify-content: center;
  }

  & > div:first-child {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    overflow-y: auto;
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const FavoriteDailyList = () => {
  const [page, setPage] = useState(1);
  const [FavoriteDaily, setFavoriteDaily] = useState(null);
  const maxPage = useRef(0);

  useEffect(() => {
    const asyncfunc = async () => {
      const result = await getFavoriteDailyMeal(page);
      console.log(result);
      setFavoriteDaily(result.content);
      maxPage.current = result.totalPages;
    };
    asyncfunc();
  }, [page]);

  const PageOnclickHandler = (howPage) => {
    setPage((prevState) => {
      const editpage = prevState + howPage;
      return editpage > 0 && editpage <= maxPage.current ? editpage : prevState;
    });
  };

  return (
    <DivStyle>
      <div>
        {Array.isArray(FavoriteDaily)
          ? FavoriteDaily.map((item) => <FavoriteDailyItem item={item} />)
          : null}
      </div>
      <div>
        <Button
          onClick={() => PageOnclickHandler(-1)}
          primary={true}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            fontSize: "22px",
          }}
        >
          &lt;
        </Button>
        <p>{page}</p>
        <Button
          onClick={() => PageOnclickHandler(1)}
          primary={true}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            fontSize: "22px",
          }}
        >
          &gt;
        </Button>
      </div>
    </DivStyle>
  );
};

export default FavoriteDailyList;
