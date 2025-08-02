import { atom } from "recoil";

export const authModalState = atom({
  key: "authModalState",
  default: {
    isOpen: false,
    type: "login"
  },
});
