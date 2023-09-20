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
const Comment = styled.textarea`
  margin: ${style.layout.narrowMargin.height/2} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} 0;
  width: 95%;
  height: auto;
  border: solid 1px rgb(200,200,200);
  &.modifyClose{
    border: none;
  }
  &.modifyClose:focus{
    outline: none;
  }
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
      .catch(err=>{
        alert("본인이 작성한 댓글만 수정할 수 있습니다.")
        console.log(err,"댓글수정실패",comment.communityCommentId)
      })
    }
    else{
      localStorage.getItem("Authorization")? setModifyOpen(!modifyOpen) : alert("로그인 후 이용해주시기 바랍니다.")
    }
  }

  function commentDelete(){
    if(modifyOpen){
      setModifyOpen(!modifyOpen)
    }
    else{
      axios.delete("http://43.201.194.176:8080/communitycomment/"+comment.communityCommentId,{
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      .then(res=>window.location.reload())
      .catch(err=>{
        alert("본인이 작성한 댓글만 삭제할 수 있습니다.")
        console.log(err,"댓글삭제 실패")
      })
    }
  }

  return(
    <CommentListBox>
      <Comment
       className={modifyOpen? "modifyOpen" : "modifyClose"}
       value={newComment}
       onChange={e=>modifyOpen? setNewComment(e.target.value) : console.log("수정버튼을 눌러주세요.")}
       readOnly={modifyOpen? false : true}
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
          <button onClick={commentDelete}>{modifyOpen? "취소" : "삭제"}</button>
      </EditBox>
    </CommentListBox>
  )
}
export default Comments;