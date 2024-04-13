import { ProfileNavAtom } from "@/features/store/atom/profile/nav.atom";
import React from "react";
import { useRecoilValue } from "recoil";

const ProfileSection = () => {
  const nav = useRecoilValue(ProfileNavAtom);
  return <div className="p-4">{nav}</div>;
};

export default ProfileSection;
