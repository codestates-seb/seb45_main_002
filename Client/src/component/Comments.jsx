import { styled } from "styled-components";

import style from "../style/style";

const CommentListBox = styled.li`
  
  background-color: white;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
`
const Comment = styled.div`
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  padding: ${style.layout.narrowMargin.height} 0;
  border: solid 1px black;
`
const Createed = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  font-size: small;
  color: gray;
  &>:first-child{
    font-weight: bolder;
  }
`

function Comments({comment}){

  return(
    <CommentListBox>
      <Comment>
        {comment.communityCommentContent}
      </Comment>
      <Createed>
        <span>
          {comment.memberId}
        </span>
        <span>
          {comment.answerComment_createdAt.slice(0,4)}년 {comment.answerComment_createdAt.slice(5,7)}월 {comment.answerComment_createdAt.slice(8,10)}일
        </span>
      </Createed>
    </CommentListBox>
  )
}
export default Comments;