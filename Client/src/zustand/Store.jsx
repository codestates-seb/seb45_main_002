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
          communityId: "1", // 게시물의 번호
          communityTitle: "게시물 제목 1", // 게시물의 제목
          communityContent: "게시물 내용 1", // 게시물의 내용
          countLike: 125, // 좋아요의 갯수
          community_createdAt: "2023-08-28", // 게시물의 작성일자
          communityViewCount: 125, // 조회수
          community_modifiedAt: "2023-08-28", // 게시물의 수정일자
          content: "blahblahblah..."
        },
        {
          communityId: "2",
          communityTitle: "게시물 제목 2",
          communityContent: "게시물 내용 2",
          countLike: 525,
          community_createdAt: "2023-08-29",
          updated_at: "2023-08-29",
          communityViewCount: 333,
          content: "blahblahblah..."
        },
        
      ],
      setArticle: (newArticle) => set({articles: newArticle})
    }))
}
export default useZustand;
