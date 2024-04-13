import { ProfilePageSideIcons } from "@/utils/helpers/nav-items";
import { atom } from "recoil";

export const ProfileNavAtom = atom({
  key: "nav/profile/atom/key",
  default: ProfilePageSideIcons[0].name,
});
