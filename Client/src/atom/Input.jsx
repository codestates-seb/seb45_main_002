
import {styled} from "styled-components";

const InputAtom = styled.input`
  border: solid 1px rgb(255, 184, 47);
  border-radius: 8px;
  ${props=>props.styling}
`

function Input({type,value,onChange,placeholder,styling}){

  return(
    <InputAtom
     type={type}
     value={value}
     onChange={onChange}
     placeholder={placeholder}

     styling={styling}
    />
  )
}
export default Input;

// 샘플 (모든 속성들은 없어도 동작합니다.)
// <Input
//   type={"text"} 
//   value={"value값"}
//   onChange={()=>console.log("이벤트 자유롭게 작성")}
//   placeholder={"임의표시"}
// 
//   styling={"width: 500px; height: 500px;"} // 이곳에 styled component에서 사용되는 css 스타일링 문법을 넣어서 인풋을 스타일링할 수 있습니다.
// />
