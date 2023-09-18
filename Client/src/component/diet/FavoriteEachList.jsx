import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { getEachMeal } from "../../util/Diet";
import { getFavoriteEachMeal } from "../../util/FavoriteDaily";
import FavoriteEachItem from "./FavoriteEachItem";
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

const FavoriteEachList = ({ timeslot, setIsModal }) => {
  const [page, setPage] = useState(1);
  const [FavoriteEach, setFavoriteEach] = useState(null);
  const [EachDetail, setEachDetail] = useState(null);
  const maxPage = useRef(0);

  useEffect(() => {
    const asyncfunc = async () => {
      if (page) {
        const result = await getFavoriteEachMeal(page);
        if (result) {
          setFavoriteEach(result.content);
          maxPage.current = result.totalPages;
        }
      } else {
        setFavoriteEach(null);
        setPage(1);
      }
    };
    asyncfunc();
  }, [page]);

  useEffect(() => {
    const asuncfunc = async () => {
      if (FavoriteEach) {
        const eachMealsId = FavoriteEach.map((item) => item.eachMealId);
        let eachMeals = [];
        for (let eachMealId of eachMealsId) {
          eachMeals = [...eachMeals, await getEachMeal(eachMealId)];
        }
        console.log("eachMeals!!");
        console.log(eachMeals);
        setEachDetail(await eachMeals);
      }
    };
    asuncfunc();
  }, [FavoriteEach]);

  const PageOnclickHandler = (howPage) => {
    setPage((prevState) => {
      const editpage = prevState + howPage;
      return editpage > 0 && editpage <= maxPage.current ? editpage : prevState;
    });
  };

  if (!FavoriteEach) {
    return <>불러올 수 있는 끼니가 없습니다.</>;
  }

  return (
    <DivStyle>
      <div>
        {Array.isArray(FavoriteEach)
          ? FavoriteEach.map((item, index) => (
              <FavoriteEachItem
                item={item}
                setPage={setPage}
                setIsModal={setIsModal}
                key={index}
                timeslot={timeslot}
                detail={EachDetail !== null ? EachDetail[index] : null}
              />
            ))
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

export default FavoriteEachList;
