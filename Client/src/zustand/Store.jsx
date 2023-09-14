import axios from "axios";

<<<<<<< HEAD
import {create} from "zustand";
=======
import { create } from "zustand";
>>>>>>> devFE

const useZustand = {
  useToken: 
    create((set) => ({
      value: "",
      setValue: (value)=>set({value: value}),
<<<<<<< HEAD
      accessToken: localStorage.getItem(null),
      setAccessToken: (token)=>set({accessToken: token})
=======
      accessToken: "",
      setAccessToken: (token)=>set({accessToken: token}),
      refreshToken: "",
      setRefreshToken: (token)=>set({refreshToken: token})
>>>>>>> devFE
    })),
  useArticles:
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
        {communityId: "2", communityTitle: "게시물 제목 2", communityContent: "게시물 내용 2", countLike: 525, community_createdAt: "2023-08-29", updated_at: "2023-08-29", communityViewCount: 333, content: "blahblahblah..."},
      ],
<<<<<<< HEAD
      setArticles: (newArticle)=>set({articles: [newArticle]}),
      axiosArticles: () => {
        axios.get("https://57b4-59-9-144-107.ngrok-free.app/community?page=1&size=",{
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          }
        })
        .then(res=>set({articles: res.data.data}))
        .catch(err=>console.log(err+"글 목록 불러오기를 실패했습니다."))
      }
    }))
}
export default useZustand;
=======
      setArticles: (newArticle)=>set({articles: newArticle}),
      axiosArticlesList: () => {
        axios.get("http://43.201.194.176:8080/community?page=1&size=",{
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((res) => set({ articles: res.data.data }))
        .catch((err) => console.log(err + "글 목록 불러오기를 실패했습니다."));
    },
  })),
};
export default useZustand;
>>>>>>> devFE
