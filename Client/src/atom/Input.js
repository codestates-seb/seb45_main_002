import {styled} from "styled-components"

function Input({
  type, value, required, size, placeholder, autoComplete, autoFocus, multiple,
  width, height, margin, padding, border, borderRadius, fontSize, color, backgroundColor
}){

  const InputAtom = styled.input`
    width: ${width}; height: ${height};
    margin: ${margin}; padding: ${padding};
    border: ${border}; border-radius: ${borderRadius};
    font-size: ${fontSize}; color: ${color};
    background-color: ${backgroundColor};
  `
  
  return(
    <InputAtom
     type={type}
     value={value}
     required={required}
     size={size}
     placeholder={placeholder}
     autoComplete={autoComplete}
     autoFocus={autoFocus}
     multiple={multiple}
    />
  )
}
export default Input;