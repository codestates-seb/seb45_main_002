import useInputStore from "../zustand/Store";
import {styled} from "styled-components";



function Input({type}){

  const InputAtom = styled.input`
  
  `
  const value = useInputStore(state=>state.value)
  const setValue = useInputStore(state=>state.setValue)
  const valueHandler=e=>setValue(e.target.value)

  return(
    <InputAtom
     type={type}
     value={value}
     onChange={valueHandler}
     autoFocus
    />
  )
}
export default Input;