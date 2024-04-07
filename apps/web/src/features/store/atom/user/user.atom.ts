import { User } from "@prisma/client";
import { atom } from "recoil";

export const UserAtom = atom({
  key: "user/get/atom",
  default: null as User | null,
});
