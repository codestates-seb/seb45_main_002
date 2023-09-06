import Input from "../atom/Input";

function MyPage() {
  return (
    <article>
      <Input
       type={"text"}
       value={"광광우럭따"}
       onChange={()=>console.log("광광")}
       placeholder={"광광울었냐"}

       styling={""}
      />
      <input type="text" value="이건 샘플" placeholder="이건 샘플" ></input>
    </article>
  );
}

export default MyPage;
