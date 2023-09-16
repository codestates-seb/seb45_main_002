import { styled } from "styled-components";

import axios from "axios";

import useZustand from "../zustand/Store";

import style from "../style/style";
import { useState } from "react";

const CommentListBox = styled.li`
  background-color: white;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
`
const Comment = styled.input`
  margin: ${style.layout.narrowMargin.height/2} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} 0;
  width: 95%;
  border: solid 1px rgb(200,200,200);
`
const Createed = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 ${style.layout.narrowMargin.width} ${style.layout.narrowMargin.height};
  font-size: small;
  color: gray;
  &>:first-child{
    font-weight: bolder;
  }
`

const EditBox = styled.div`
  
`

function Comments({comment}){

  const [modifyOpen,setModifyOpen] = useState(false)
  const [newComment, setNewComment] = useState(comment.communityCommentContent)

  const communityId = useZustand.useCommunityId(state=>state.communityId)

  function commentModify(){
    if(modifyOpen){
      axios.patch("http://43.201.194.176:8080/communitycomment/"+comment.communityCommentId,{
        communityId: communityId,
        communityCommentId: comment.communityCommentId,
        communityCommentContent: newComment
      },{
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      .then(res=>{
        window.location.reload()
        setModifyOpen(!modifyOpen)
      })
      .catch(err=>console.log(err,"댓글수정실패",comment.communityCommentId))
    }
    else{
      setModifyOpen(!modifyOpen)
    }
  }

  function commentDelete(){
    axios.delete("http://43.201.194.176:8080/communitycomment/"+comment.communityCommentId,{
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    .then(res=>window.location.reload())
    .catch(err=>console.log(err,"댓글삭제 실패"))
  }
console.log(comment)
  return(
    <CommentListBox>
      <Comment
       value={newComment}
       onChange={e=>modifyOpen? setNewComment(e.target.value) : console.log("수정버튼을 눌러주세요.")}
      >
      </Comment>
      <Createed>
        <span>
          {comment.nickname}
        </span>
        <span>
          {/* {comment.answerComment_createdAt.slice(0,4)}년  */}
          {comment.answerComment_createdAt.slice(5,7)}월 {comment.answerComment_createdAt.slice(8,10)}일 {comment.answerComment_createdAt.slice(11,16)}
        </span>
      </Createed>
      <EditBox>
        <button onClick={commentModify}>{modifyOpen? "완료" : "수정"}</button>
        <button onClick={commentDelete}>{modifyOpen? "" : "삭제"}</button>
      </EditBox>
    </CommentListBox>
  )
}
export default Comments;