import Input from "../atom/Input";
import useInputStore from "../zustand/Store";

function MyPage() {
  return (
    <article>
      <Input type={"text"} width={"300px"} height={"300px"} margin={"30px"} padding={"30px"} border={"solid 5px red"} borderRadius={"50px"} />
      <Input inValue={"버튼"} type={"button"} width={"300px"} height={"300px"} margin={"30px"} padding={"30px"} border={"solid 5px red"} borderRadius={"50px"} />
      <Input type={"radio"} />
    </article>
  );
}

export default MyPage;
