import { atom } from "recoil";

export const darkState = atom({
  key: "darkState",
  default: true
})
export const inputState = atom<string>({
  key: "inputState",
  default: ""
})
