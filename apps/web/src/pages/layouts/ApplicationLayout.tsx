import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetUser } from "@/features/hooks/user/useGetUser";
import { GiMoonOrbit } from "react-icons/gi";
import { Outlet } from "react-router-dom";

const ApplicationLayout = () => {
  const { user, loading } = useGetUser();

  if (loading) {
    return (
      <div className="h-screen w-screen relative z-10">
        <Loading />
      </div>
    );
  }
  return (
    <div className="h-screen w-screen bg-blackdark text-white flex">
      <section className="h-full w-[3.5vw]">
        <nav className="h-[7vh] w-full flex items-center justify-center text-4xl p-2 ">
          <GiMoonOrbit className="text-green-200 border border-white/15 h-full w-full p-[8px] rounded-lg hover:bg-white/5 cursor-pointer" />
        </nav>
        <Separator className="bg-white/10" />

        <section className="h-[92vh] w-full flex flex-col justify-between items-center p-2 pb-1">
          <div className="h-[2vh]">Hi</div>

          <div className="h-[5.5vh] w-full ">
            <img
              src={user?.image}
              className="rounded-md overflow-hidden opacity-75  cursor-pointer hover:opacity-100 border border-white/10 "
            />
          </div>
        </section>
      </section>
      <Separator orientation="vertical" className="bg-white/10" />
      <section className="h-full w-[96.5vw] ">
        <nav className="h-[7vh] w-full"></nav>
        <section className="h-[92vh] w-full">
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export default ApplicationLayout;
