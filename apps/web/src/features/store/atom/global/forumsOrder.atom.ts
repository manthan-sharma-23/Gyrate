import { atom } from "recoil";
import { forumsOrder } from "types";

export const forumsOrderAtom = atom({
  key: "orderof/forums/page/atom",
  default: forumsOrder.recent,
});
