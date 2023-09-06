import {create} from "zustand"

const useZustand = {
  useToken: 
    create((set) => ({
      value: "",
      setValue: (value)=>set({value: value}),
      accessToken: localStorage.getItem(null),
      setAccessToken: (token)=>({accessToken: token})
    })),
  useArticle:
    create((set)=>({
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
      setArticle: (newArticle) => set({articles: newArticle})
    }))
}
export default useZustand;
