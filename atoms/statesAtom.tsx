import { atom } from "recoil";

export const darkState = atom({
  key: "darkState",
  default: true
})
export const sideBarState = atom({
  key: "sideBarState",
  default: false
})
