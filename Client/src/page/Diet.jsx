import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { GetDailyDiet, PostDailyMeal, PatchDailyMeal } from "../util/Diet";
import EachMeal from "../component/diet/EachMeal";
import Button from "../atom/button";
import useZustand from "../zustand/Store";
import FavoriteDailyList from "../component/diet/FavoriteDailyList";
import Modal from "../atom/GlobalModal";
import InputAddFavorite from "../component/diet/InputAddFavorite";
import DeleteModal from "../component/diet/DeleteModal";
import { postFavoriteEachMeal } from "../util/FavoriteDaily";
import AnalyzedDiet from "../component/diet/DietAnalyze";
import style from "../style/style";
import auctionbuy from "../../src/asset/auctionbuy.png";
import naverbuy from "../../src/asset/naverbuy.png";
import coupangbuy from "../../src/asset/coupangbuy.png";

const StyleDiet = styled.div`
  width: 100%;
  height: max-content;

  & > p {
    font-size: 14px;
    color: #898989;
    text-align: right;
    margin-right: 10px;
    margin-bottom: 40px;
    cursor: pointer;

    &:active,
    &:hover,
    &:focus {
      color: red;
    }
  }
`;

const DivButton = styled.div`
  width: calc(50% - 10px);
  margin: 10px 5px 0 5px;
  display: flex;
  gap: 10px;
  button {
    width: calc(50% - 5px);
  }

  @media (max-width: 800px) {
    width: calc(100% - 10px);
  }
`;

const DivTotal = styled.div`
  width: calc(100%-10px);
  margin: 10px 5px 5px 5px;
  padding: 10px 20px;
  height: 180px;
  background-color: white;
  border-radius: 8px;
  font-size: 14px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h3 {
    font-size: 18px;
    margin-right: 10px;
  }

  & > div {
    width: 100%;
    display: flex;
    align-items: center;

    p {
      width: 50%;
    }
  }
`;

const StyleNewDiet = styled.div`
  width: 100%;
  margin: calc(50vh - 120px) 0 0 0;
  display: flex;
  justify-content: center;
  h3 {
    font-size: 16px;
  }
  div {
    width: 240px;
    height: 180px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

const Container = styled.div`
  /* overflow: auto; */
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 70vw;
  height: auto;
  /* border: 1px solid orange; */
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.div`
  /* overflow: auto; */
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: space-between;
  gap: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 60%;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  margin-top: -12px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25%;
  max-height: 20vh;
  border-bottom: 1px solid #dadada;

  & > div {
    /* margin: 0 auto; */
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const LinkContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid red;
`;

const CustomSpan = styled.span`
  color: black;
`;

const today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let day = today.getDate(); //일

const Diet = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);
  const [analyzedData, setAnalyzedData] = useState(null);
  const param = useParams();
  const [date, setDate] = useState(
    "date" in param
      ? param.date
      : `${year}-${month >= 10 ? month : "0" + month}-${
          day >= 10 ? day : "0" + day
        }`
  );
  const [modalContents, setModalContents] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const { meal, setMeal } = useZustand.useDailyMeals();

  useEffect(() => {
    const asyncfunc = async () => {
      setMeal(await GetDailyDiet(date));
    };
    asyncfunc();
  }, [date]);

  useEffect(() => {
    if (modalContents) {
      setIsModal(true);
    }
  }, [modalContents]);

  const addDailyMealOnClickHandler = async () => {
    setMeal(await PostDailyMeal(date));
  };

  const deleteDailyOnClickHandler = () => {
    setIsModal(true);
    setModalContents(() => (
      <DeleteModal dailyMealId={meal.dailyMealId} setIsModal={setIsModal} />
    ));
  };

  const addFavoriteDailyOnClickHandler = () => {
    setIsModal(true);
    setModalContents(() => (
      <InputAddFavorite meal={meal} setIsModal={setIsModal} />
    ));
  };

  const loadFavoriteDailyOnclickHandler = () => {
    setIsModal(true);
    setModalContents(() => (
      <FavoriteDailyList date={date} setIsModal={setIsModal} />
    ));
  };

  const addEachMealOnClickHandler = (eachMeal) => {
    setIsModal(true);
    setModalContents(() => {
      postFavoriteEachMeal(eachMeal);
      return (
        <InputAddFavorite
          meal={meal}
          setIsModal={setIsModal}
          defaultResult={true}
        />
      );
    });
  };

  const handleAnalyzeDiet = async (dailymealId, analysisId) => {
    try {
      // console.log(meal);
      dailymealId = meal.dailyMealId;
      const analyzedData = await AnalyzedDiet(dailymealId);
      setAnalyzedData();
      setIsModalOpen(true);
      setModalHeader(<h2>분석 결과</h2>);
      setModalFooter();
      // console.log(analyzedData);
      // console.log(analyzedData.dailyMeal);
      // console.log(analyzedData.result);

      if (analyzedData === undefined) {
        setModalHeader(<h2>오류</h2>);
        setModalContent(
          <FlexContainer>
            식단 정보가 없거나 <br />
            통신이 불안정해요!
          </FlexContainer>
        );
      }

      if (analyzedData.dailyMeal.totalDailyKcal <= 0) {
        setModalHeader(<h2>오류</h2>);
        setModalContent(
          <FlexContainer>
            식단을 채워주세요! <br />
          </FlexContainer>
        );
      } else
        setModalContent(
          <Container>
            <FlexContainer>
              <ItemContainer>
                <div>
                  총 섭취 칼로리 : {analyzedData.dailyMeal.totalDailyKcal}Kcal
                </div>
                <div>권장 칼로리: {Math.floor(analyzedData.idealKcal)}Kcal</div>
                {Math.floor(analyzedData.idealKcal * 0.1) <
                  Math.abs(analyzedData.overKcal) && (
                  <div
                    style={{
                      color: analyzedData.overKcal < 0 ? "orange" : "red",
                    }}
                  >
                    {analyzedData.overKcal < 0
                      ? `부족한 칼로리: ${Math.floor(
                          Math.abs(analyzedData.overKcal)
                        )}Kcal`
                      : `초과 칼로리: ${Math.floor(analyzedData.overKcal)}Kcal`}
                  </div>
                )}
              </ItemContainer>
              <ItemContainer>
                <div>
                  총 섭취 탄수화물: {analyzedData.dailyMeal.totalDailyCarbo}g
                </div>
                <div>
                  권장하는 탄수화물:{" "}
                  {analyzedData.idealMacro.idealCarbohydrates}g
                </div>
                {analyzedData.idealMacro.idealCarbohydrates * 0.1 <
                  Math.abs(analyzedData.overMacro.overCarbohydrates) && (
                  <div
                    style={{
                      color:
                        analyzedData.overMacro.overCarbohydrates < 0
                          ? "EABA34"
                          : "red",
                    }}
                  >
                    {analyzedData.overMacro.overCarbohydrates < 0
                      ? `부족한 탄수화물: ${Math.abs(
                          analyzedData.overMacro.overCarbohydrates
                        )}g`
                      : `초과 탄수화물: ${analyzedData.overMacro.overCarbohydrates}g`}
                  </div>
                )}
                {analyzedData.idealMacro.idealCarbohydrates * 0.1 >=
                  Math.abs(analyzedData.overMacro.overCarbohydrates) && (
                  <div style={{ color: "2A7625" }}>적절해요 !</div>
                )}
              </ItemContainer>
              <ItemContainer>
                <div>
                  총 섭취 단백질: {analyzedData.dailyMeal.totalDailyProtein}g
                </div>
                <div>
                  권장하는 단백질: {analyzedData.idealMacro.idealProteins}g
                </div>
                {analyzedData.idealMacro.idealProteins * 0.1 <
                  Math.abs(analyzedData.overMacro.overProteins) && (
                  <div
                    style={{
                      color:
                        analyzedData.overMacro.overProteins < 0
                          ? "red"
                          : "EABA34",
                    }}
                  >
                    {analyzedData.overMacro.overProteins < 0
                      ? `부족한 단백질: ${Math.abs(
                          analyzedData.overMacro.overProteins
                        )}g`
                      : `초과 단백질: ${analyzedData.overMacro.overProteins}g`}
                  </div>
                )}
                {analyzedData.idealMacro.idealProteins * 0.1 >=
                  Math.abs(analyzedData.overMacro.overProteins) && (
                  <div style={{ color: "2A7625" }}>적절해요 !</div>
                )}
              </ItemContainer>
              <ItemContainer>
                <div>총 섭취 지방: {analyzedData.dailyMeal.totalDailyFat}g</div>
                <div>권장하는 지방: {analyzedData.idealMacro.idealFats}g</div>
                {analyzedData.idealMacro.idealFats * 0.1 <
                  Math.abs(analyzedData.overMacro.overFats) && (
                  <div
                    style={{
                      color:
                        analyzedData.overMacro.overFats < 0 ? "F4D787" : "red",
                    }}
                  >
                    {analyzedData.overMacro.overFats < 0
                      ? `부족한 지방: ${Math.abs(
                          analyzedData.overMacro.overFats
                        )}g`
                      : `초과 지방: ${analyzedData.overMacro.overFats}g`}
                  </div>
                )}
                {analyzedData.idealMacro.idealFats * 0.1 >=
                  Math.abs(analyzedData.overMacro.overFats) && (
                  <div style={{ color: "2A7625" }}>적절해요 !</div>
                )}
              </ItemContainer>
              <ItemContainer>
                {/* <h4>총 영양소 비율</h4> */}
                <div>
                  <div>
                    <div>
                      {" "}
                      탄수화물 비율:{" "}
                      {Math.floor(
                        analyzedData.percentMacro.percentCarbos * 100
                      )}
                      %
                    </div>
                    <div>
                      {" "}
                      단백질 비율:{" "}
                      {Math.floor(
                        analyzedData.percentMacro.percentProteins * 100
                      )}
                      %
                    </div>
                    <div>
                      {" "}
                      지방 비율:{" "}
                      {Math.floor(analyzedData.percentMacro.percentFats * 100)}%
                    </div>
                  </div>
                </div>
              </ItemContainer>
              <ItemContainer>
                <div>
                  {analyzedData.overPercentMacro.overFats < 0
                    ? `부족한 탄수화물 비율: ${Math.abs(
                        Math.floor(
                          analyzedData.overPercentMacro.overPercentCarbos
                        )
                      )}%`
                    : `초과 탄수화물 비율: ${Math.abs(
                        Math.floor(
                          analyzedData.overPercentMacro.overPercentCarbos * 100
                        )
                      )}%`}
                </div>
                <div>
                  {analyzedData.overPercentMacro.overPercentProteins < 0
                    ? `부족한 단백질 비율: ${Math.abs(
                        Math.floor(
                          analyzedData.overPercentMacro.overPercentProteins
                        )
                      )}%`
                    : `초과 단백질 비율: ${Math.floor(
                        analyzedData.overPercentMacro.overPercentProteins * 100
                      )}%`}
                </div>
                <div>
                  {analyzedData.overPercentMacro.overPercentFats < 0
                    ? `부족한 지방 비율: ${Math.abs(
                        Math.floor(
                          analyzedData.overPercentMacro.overPercentFats
                        )
                      )}%`
                    : `초과 지방 비율: ${Math.floor(
                        analyzedData.overPercentMacro.overPercentFats * 100
                      )}%`}
                </div>
              </ItemContainer>
              <ItemContainer>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>평가</div>
                <div>
                  {analyzedData.result.split("\n").map((line, index) => {
                    let style = {};

                    if (line.includes("불량")) {
                      style.color = "red";
                    } else if (line.includes("양호")) {
                      style.color = "2A7625";
                    }
                    return (
                      <div key={index} style={style}>
                        {line}
                      </div>
                    );
                  })}
                </div>
              </ItemContainer>{" "}
              <ImageContainer style={{ maxHeight: "600px" }}>
                <h3 style={{ marginBottom: "20px" }}>추천 음식 구매하기</h3>
                <a href={analyzedData.auctionURL}>
                  <img
                    alt="auction"
                    src={auctionbuy}
                    style={{ maxWidth: "80%", maxHeight: "80px" }}
                  ></img>
                </a>
                <a href={analyzedData.naverURL}>
                  <img
                    alt="auction"
                    src={naverbuy}
                    style={{ maxWidth: "80%", maxHeight: "80px" }}
                  ></img>
                </a>
                <a href={analyzedData.coupangURL}>
                  <img
                    alt="auction"
                    src={coupangbuy}
                    style={{ maxWidth: "80%", maxHeight: "80px" }}
                  ></img>
                </a>
              </ImageContainer>
            </FlexContainer>
          </Container>
        );
      setModalFooter(<div></div>);
    } catch (error) {
      console.error("Error analyzing diet", error);
    }
  };

  // if (meal === "") {
  //   return <></>;
  // }

  if (meal === null) {
    // alert("로그인 후 이용해주시기 바랍니다.");
    // navigate("/");
    return <div>로그인 후 이용해주세요</div>;
  }

  ///////////////////////////////////////////////////////////
  if (meal === "DailyMeal not found...") {
    /// 해당 날짜 저장된 식단이 없는 경우
    return (
      <>
        {isModal ? (
          <Modal
            style={{ maxWidth: "680px", width: "90vw", maxHeight: "80vh" }}
            isOpen={isModal}
            content={modalContents}
            setIsOpen={setIsModal}
            setContent={setModalContents}
            setHeader={() => {}}
            setFooter={() => {}}
          />
        ) : null}
        <StyleNewDiet>
          <div>
            <h3>저장된 식단이 아직 없습니다.</h3>
            <Button primary={true} onClick={addDailyMealOnClickHandler}>
              커스텀 식단 만들기
            </Button>
            <Button onClick={loadFavoriteDailyOnclickHandler}>
              저장한 식단 불러오기
            </Button>
          </div>
        </StyleNewDiet>
      </>
    );
  }

  return (
    // 식단 출력
    <>
      {isModal ? (
        <Modal
          style={{
            minWidth: "240px",
            maxWidth: "90vw",
            minHeight: "180px",
            maxHeight: "80vh",
          }}
          isOpen={isModal}
          content={modalContents}
          setIsOpen={setIsModal}
          setContent={setModalContents}
          setHeader={() => {}}
          setFooter={() => {}}
        />
      ) : null}
      <StyleDiet>
        {[1, 2, 3].map((timeslot, index) => (
          <EachMeal
            key={index}
            date={date}
            timeslot={timeslot}
            addEachMealOnClickHandler={addEachMealOnClickHandler}
            setIsModal={setIsModal}
            setModalContents={setModalContents}
          />
        ))}
        <DivButton>
          <Button onClick={addFavoriteDailyOnClickHandler}>
            선호식단 저장하기
          </Button>
          <Button dailymealId={meal?.dailyMealId} onClick={handleAnalyzeDiet}>
            자세히 분석하기
          </Button>
        </DivButton>

        <DivTotal>
          {/* 하루 총 평 */}

          <Modal
            isOpen={isModalOpen}
            content={modalContent}
            header={modalHeader}
            footer={modalFooter}
            setIsOpen={setIsModalOpen}
            setContent={setModalContent}
            setHeader={setModalHeader}
            setFooter={setModalFooter}
          />
          <div>
            <h3>하루 섭취량</h3>
          </div>
          <div>
            <p>칼로리: {meal?.totalDailyKcal ?? ""}kcal</p>
            <p>탄수화물: {meal?.totalDailyCarbo ?? ""}g</p>
          </div>
          <div>
            <p>단백질: {meal?.totalDailyProtein ?? ""}g</p>
            <p>지방: {meal?.totalDailyFat ?? ""}g</p>
          </div>
        </DivTotal>
        <p onClick={deleteDailyOnClickHandler}>식단 삭제하기</p>
      </StyleDiet>
    </>
  );
};

export default Diet;
