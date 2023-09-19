import axios from "axios";

import { create } from "zustand";

const useZustand = {
  useToken: 
    create((set) => ({
      value: "",
      setValue: (value)=>set({value: value}),
      accessToken: "",
      setAccessToken: (token)=>set({accessToken: token}),
      refreshToken: "",
      setRefreshToken: (token)=>set({refreshToken: token})
    })),
  useCommunityId:
    create((set)=>({
      communityId: "",
      setCommunityId: (id)=>set({communityId: id})
    })),
  useDailyMeals: create((set) => ({
    meal: null,
    setMeal: (value) => set({ meal: value }),
    setEachMeal: (value) => set({ meal: value }),
  })),
  useNowTimeSlot: create((set) => ({
    nowTimeSlot: 0,
    setNowTimeSlot: (value) => set({ nowTimeSlot: value }),
  })),
};
export default useZustand;
