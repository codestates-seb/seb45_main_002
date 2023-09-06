
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