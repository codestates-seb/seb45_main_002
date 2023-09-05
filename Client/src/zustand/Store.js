import { create } from "zustand";

const useInputStore = create((set) => ({
  value: "",
  setValue: (value) => set({ value: value }),
}));
export default useInputStore;
