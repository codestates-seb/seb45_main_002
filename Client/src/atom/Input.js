import useInputStore from "../zustand/Store";
import { styled } from "styled-components";

const InputAtom = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
`;

function Input({
  type,
  width,
  height,
  margin,
  padding,
  border,
  borderRadius,
  inValue,
}) {
  const value = useInputStore((state) => state.value);
  const setValue = useInputStore((state) => state.setValue);
  const valueHandler = (e) => setValue(e.target.value);

  return (
    <InputAtom
      type={type}
      value={type.includes("text") ? value : inValue}
      onChange={type.includes("text") ? valueHandler : null}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      border={border}
      borderRadius={borderRadius}
    />
  );
}
export default Input;
