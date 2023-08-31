import Input from "../atom/Input";
import useInputStore from "../zustand/Store";

function MyPage(){

  return(
    <article>
      <Input />
      <Input type={"button"} />
      <Input type={"radio"} />
    </article>
  )
}
export default MyPage;