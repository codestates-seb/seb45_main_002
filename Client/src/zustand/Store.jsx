import axios from "axios";

import { create } from "zustand";

const useZustand = {
  useToken: create((set) => ({
    value: "",
    setValue: (value) => set({ value: value }),
    accessToken: "",
    setAccessToken: (token) => set({ accessToken: token }),
    refreshToken: "",
    setRefreshToken: (token) => set({ refreshToken: token }),
  })),
  useArticles: create((set) => ({
    articles: [
      {
        communityId: "1", // 게시물의 번호
        communityTitle: "게시물 제목 1", // 게시물의 제목
        communityContent: "게시물 내용 1", // 게시물의 내용
        countLike: 125, // 좋아요의 갯수
        community_createdAt: "2023-08-28", // 게시물의 작성일자
        communityViewCount: 125, // 조회수
        community_modifiedAt: "2023-08-28", // 게시물의 수정일자
        content: "blahblahblah...",
      },
      {
        communityId: "2",
        communityTitle: "게시물 제목 2",
        communityContent: "게시물 내용 2",
        countLike: 525,
        community_createdAt: "2023-08-29",
        updated_at: "2023-08-29",
        communityViewCount: 333,
        content: "blahblahblah...",
      },
    ],
    setArticles: (newArticle) => set({ articles: newArticle }),
    axiosArticlesList: () => {
      axios
        .get("http://43.201.194.176:8080/community?page=1&size=", {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((res) => set({ articles: res.data.data }))
        .catch((err) => console.log(err + "글 목록 불러오기를 실패했습니다."));
    },
  })),

  useDailyMeals: create((set) => ({
    meal: {
      dailyMealId: 365,
      memberId: 18,
      date: "2023-09-14",
      name: "name",
      favorite: false,
      eachMeals: [],
      totalDailyKcal: 0.0,
      totalDailyCarbo: 0.0,
      totalDailyProtein: 0.0,
      totalDailyFat: 0.0,
    },
    setMeal: (value) => set({ meal: value }),
    setEachMeal: (value) => set({ meal: value }),
  })),

  useNowTimeSlot: create((set) => ({
    nowTimeSlot: 0,
    setNowTimeSlot: (value) => set({ nowTimeSlot: value }),
  })),

  useFavorite: create((set) => ({
    favorites: [{}, {}],
    setFavorites: (newFavorite) => set({ favorites: newFavorite }),
    axiosFavorites: () => {
      axios
        .get("http://43.201.194.176:8080/dailymeals?page=1&size=100", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => set({ favorites: res.data }))
        .catch((err) => console.log(err, "서버와 소통에 실패했습니다."));
    },
  })),
};
export default useZustand;
