import create from "zustand";
import axios from "axios";

const useArticleStore = create((set) => ({
  articles: [
    {
      communityId: 1,
      communityTitle: "게시물 제목 1",
      communityContent: "게시물 내용 1",
      countLike: 125,
      memberId: 1,
      community_createdAt: "2023-08-28",
      community_modifiedAt: "2023-08-28",
      communityViewCount: 125,
    },
    {
      communityId: 2,
      communityTitle: "게시물 제목 2",
      communityContent: "게시물 내용 2",
      countLike: 525,
      memberId: 2,
      community_createdAt: "2023-08-29",
      updated_at: "2023-08-29",
      communityViewCount: 333,
    },
  ],

  setArticles: (newArticles) => set({ articles: newArticles }),

  fetchArticles: async () => {
    try {
      const response = await axios.get(
        "https://e105-59-9-144-107.ngrok-free.app/community?page=1&size=10",
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const data = response.data.data;
      console.log(data);
      const articlesArray = Object.values(data);
      set({ articles: articlesArray });
    } catch (error) {
      console.error("fetch article error:", error);
    }
  },
}));

export default useArticleStore;
