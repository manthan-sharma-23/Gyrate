import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetUser } from "@/features/hooks/user/useGetUser";
import { navItems } from "@/utils/helpers/nav-items";
import { GiMoonOrbit } from "react-icons/gi";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const ApplicationLayout = () => {
  const { user, loading } = useGetUser();
  const { pathname } = useLocation();

  console.log(pathname);

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

        <div className="h-[92vh] w-full flex flex-col justify-between items-center p-2 pb-1">
          <div className="h-auto w-full flex flex-col text-[1.7rem] mt-2 items-center justify-start">
            {navItems.map((item) => (
              <Link to={item.href} key={item.href} className="mb-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      className={cn(
                        "p-0 rounded-md hover:bg-white/5 font-thin text-white/70  h-[2.6rem] w-[2.6rem] flex justify-center items-center",
                        pathname.startsWith(item.href) &&
                          "bg-white/5 text-white"
                      )}
                    >
                      <item.icon />
                    </TooltipTrigger>
                    <TooltipContent
                      className="border  border-white/5 text-white bg-black"
                      side="right"
                    >
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            ))}
          </div>

          <div className="h-[5.5vh] w-full top-1 relative">
            <div className="border rounded-md border-white/20 p-1">
              <img
                src={user?.image}
                className="rounded-md overflow-hidden opacity-75  cursor-pointer hover:opacity-100 border border-white/10 "
              />
            </div>
          </div>
        </div>
      </section>
      <Separator orientation="vertical" className="bg-white/10" />
      <section className="h-full w-[96.5vw] ">
        <Outlet />
      </section>
    </div>
  );
};

export default ApplicationLayout;
