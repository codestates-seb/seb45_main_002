import {create} from "zustand"

const useZustand = create((set) => ({
  value: "",
  setValue: (value)=>set({value: value}),
  accessToken: localStorage.getItem("access_token"),
  setAccessToken: (token)=>({accessToken: token})
}))
export default useZustand;
