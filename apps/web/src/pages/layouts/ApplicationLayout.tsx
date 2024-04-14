import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetUser } from "@/features/hooks/user/useGetUser";
import "@/utils/styles/scroll-bar.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { PiGraphFill } from "react-icons/pi";
import { BsList } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoChatbubbleEllipsesOutline, IoSearchOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Notifications from "../Containers/Notifications";
import { cn } from "@/lib/utils";

const ApplicationLayout = () => {
  const { user, loading } = useGetUser();
  const { pathname } = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-darkblack">
        <Loading />
      </div>
    );
  }
  return (
    <div className="h-screen w-screen text-white bg-darkblack overflow-hidden">
      <nav className="h-[7vh] w-full flex justify-between items-center px-6">
        <div className="flex justify-between items-center h-full w-[55vw]">
          <div className="text-2xl h-full flex items-center font-bold font-poppins tracking-wide">
            Gyrate
          </div>
          <div className="flex h-[4.7vh] cursor-pointer  items-center gap-2 bg-lightolive px-3 py-2 rounded-3xl">
            <IoSearchOutline className="text-xl p-[2px] " />
            <input
              placeholder="Search..."
              className=" outline-none ml-1 text-white/80 border-0 w-[23vw] focus:border-0 bg-transparent"
            />
          </div>
        </div>
        <div className="h-full w-auto text-[2.6rem] flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:none focus:border-0 ">
              <IoMdNotifications className="text-white/45 hover:text-white/85  hover:bg-white/15 p-2 cursor-pointer rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="overflow-hidden rounded-xl w-[20vw] h-[50vh] bg-darkblack shadow-lg p-2 shadow-black  text-white border-0 mt-2 mr-[5vw] relative">
              <Notifications />
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:none focus:border-0 ">
              <img
                src={user?.image}
                className="cursor-pointer h-[2.6rem] rounded-full opacity-80 hover:opacity-100 p-1 hover:bg-white/15"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-white/60  overflow-hidden rounded-xl w-[13vw] h-auto bg-darkblack shadow-md p-2 shadow-black  text-white mt-2 mr-[1vw] relative"></DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <Separator className="bg-darkwhite" />
      <section className="h-[93vh] w-full flex ">
        <nav className="p-1 h-full w-[13%] overflow-y-scroll pt-1 scroll-ui font-poppins flex flex-col justify-start items-center">
          <div className="w-full h-auto">
            <Link
              to="/"
              className={cn(
                "px-7 text-[1.2rem] text-white/70 hover:text-white py-2 rounded-xl my-1 flex gap-4 items-center w-full hover:bg-white/5",
                pathname === "/" && "bg-white/5 text-white"
              )}
            >
              <GoHomeFill />
              <p className="font-light text-[1rem]">Home</p>
            </Link>
          </div>
          <div className="w-full h-auto">
            <Link
              to="/f/trending"
              className={cn(
                "px-7 text-[1.2rem] text-white/70 hover:text-white py-2 rounded-xl my-1 flex gap-4 items-center w-full hover:bg-white/5",
                pathname.startsWith("/f/trending") && "bg-white/5 text-white"
              )}
            >
              <PiGraphFill />
              <p className="font-light text-[1rem]">Popular</p>
            </Link>
          </div>
          <div className="w-full h-auto">
            <Link
              to="/f/all"
              className={cn(
                "px-7 text-[1.2rem] text-white/70 hover:text-white py-2 rounded-xl my-1 flex gap-4 items-center w-full hover:bg-white/5",
                pathname.startsWith("/f/all") && "bg-white/5 text-white"
              )}
            >
              <BsList />
              <p className="font-light text-[1rem]">All</p>
            </Link>
          </div>
          <div className="w-full h-auto">
            <Link
              to="/f/chat"
              className={cn(
                "px-7 text-[1.2rem] text-white/70 hover:text-white py-2 rounded-xl my-1 flex gap-4 items-center w-full hover:bg-white/5",
                pathname.startsWith("/f/chat") && "bg-white/5 text-white"
              )}
            >
              <IoChatbubbleEllipsesOutline />
              <p className="font-light text-[1rem]">Chat</p>
            </Link>
          </div>
          <Separator className="bg-white/10 my-2 w-[94%]" />
          <Accordion type="multiple" draggable className="w-full ">
            <AccordionItem value="Spaces" className="border-0 ">
              <AccordionTrigger className="text-white/60 hover:text-white pr-4 pl-5 text-[1rem] border-0 outline-none hover:bg-white/5 py-3 h-auto hover:no-underline rounded-xl cursor-pointer">
                Spaces
              </AccordionTrigger>
              <AccordionContent className="px-7 border-0 outline-none my-2">
                Yes. It adheres to the WAI-ARIA design pattern. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ipsa repudiandae
                voluptates animi doloremque molestias facere debitis perferendis
                officiis repellat. Quod deserunt sapiente quis corrupti
                molestias, dolores tenetur natus, hic doloribus iusto nostrum
                esse nisi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Announcements" className="border-0 ">
              <AccordionTrigger
                onPointerDown={() => {
                  console.log("new it");
                }}
                className="text-white/60 hover:text-white pr-4 pl-5 text-md border-0 outline-none hover:bg-white/5 py-3 h-auto hover:no-underline rounded-xl cursor-pointer"
              >
                Recent
              </AccordionTrigger>
              <AccordionContent className="px-7 border-0 outline-none my-2">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="About" className="border-0 ">
              <AccordionTrigger className="text-white/60 hover:text-white pr-4 pl-5 text-[1rem] border-0 outline-none hover:bg-white/5 py-3 h-auto hover:no-underline rounded-xl cursor-pointer">
                About
              </AccordionTrigger>
              <AccordionContent className="px-7 border-0 outline-none my-2">
                Yes. It adheres to the WAI-ARIA design pattern. Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Sit eius facilis
                provident tempore quas voluptatibus repudiandae reprehenderit
                voluptatem, aperiam facere ab! Aperiam velit doloremque, a
                itaque eius, numquam libero deleniti, quas totam ducimus ut
                iusto nesciunt unde cumque consequatur minima modi illum quia
                beatae quaerat architecto alias fugiat! Provident architecto
                esse aliquam sit neque consectetur delectus doloribus,
                reiciendis nulla ut animi maxime sint voluptatibus sed fugit
                accusamus maiores assumenda accusantium? Eligendi omnis in quod
                enim commodi temporibus nam explicabo alias natus sint qui iste
                repellat consequuntur, sed officiis. Tempore, facere!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
        <Separator className="bg-darkwhite" orientation="vertical" />
        <div className="h-full w-[87%]">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default ApplicationLayout;
