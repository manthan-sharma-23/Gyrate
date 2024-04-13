import { ProfileNavAtom } from "@/features/store/atom/profile/nav.atom";
import { cn } from "@/lib/utils";
import { ProfilePageSideIcons } from "@/utils/helpers/nav-items";
import { useRecoilState } from "recoil";
import ProfileSection from "./ProfileSection";

const Profile = () => {
  const [nav, setNav] = useRecoilState(ProfileNavAtom);
  return (
    <div className="flex gap-3 h-full w-full overflow-hidden">
      <div className="w-[20%] h-full pl-3 pt-10">
        {ProfilePageSideIcons.map((item) => (
          <div
            onClick={() => setNav(item.name)}
            className={cn(
              "w-full hover:bg-white/5 mb-2 flex gap-2 text-[1rem] text-white/60 items-center cursor-pointer px-3 py-1 rounded-md",
              nav === item.name && "bg-white/5 text-white"
            )}
          >
            <item.icon className="text-[1.2rem]" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="w-[60%]">
        <ProfileSection />
      </div>
    </div>
  );
};
export default Profile;
