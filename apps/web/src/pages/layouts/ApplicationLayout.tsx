import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetUser } from "@/features/hooks/user/useGetUser";
import { Bell } from "lucide-react";
import "@/utils/styles/scroll-bar.css";
import { Link, Outlet } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { PiGraphFill } from "react-icons/pi";
import { BsList } from "react-icons/bs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoSearchOutline } from "react-icons/io5";

const ApplicationLayout = () => {
  const { user, loading } = useGetUser();

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
        <div className="flex justify-between w-[55vw]">
          <div className="text-2xl font-bold font-poppins tracking-wide">
            Gyrate
          </div>
          <div className="flex items-center gap-2 bg-lightolive px-3 py-2 rounded-3xl">
            <IoSearchOutline className="text-xl p-[2px] " />
            <input
              placeholder="Search..."
              className="outline-none border-0 w-[20vw] focus:border-0 bg-transparent"
            />
          </div>
        </div>
        <div className="h-full w-auto flex gap-2 items-center">
          <Bell
            size={40}
            className="text-white/60 hover:text-white text-[3rem] hover:bg-white/15 p-2 cursor-pointer rounded-full"
          />
          <img
            src={user?.image}
            className="cursor-pointer h-[2.6rem] rounded-full opacity-80 hover:opacity-100 p-1 hover:bg-white/15"
          />
        </div>
      </nav>
      <Separator className="bg-darkwhite" />
      <section className="h-[93vh] w-full flex ">
        <nav className="p-1 h-full w-[13%] overflow-y-scroll pt-1 scroll-ui font-poppins flex flex-col justify-start items-center">
          <div className="w-full h-auto">
            <Link
              to="/"
              className="px-7 text-[1.2rem] text-white/70 hover:text-white py-2 rounded-lg my-1 flex gap-4 items-center w-full hover:bg-white/5"
            >
              <GoHomeFill />
              <p className="font-light text-[1rem]">Home</p>
            </Link>
          </div>
          <div className="w-full h-auto">
            <Link
              to="/f/trending"
              className="px-7 text-[1.2rem] text-white/70 hover:text-white py-2 rounded-lg my-1 flex gap-4 items-center w-full hover:bg-white/5"
            >
              <PiGraphFill />
              <p className="font-light text-[1rem]">Popular</p>
            </Link>
          </div>
          <div className="w-full h-auto">
            <Link
              to="/f/all"
              className="px-7 text-[1.2rem] text-white/70 hover:text-white py-2 rounded-lg my-1 flex gap-4 items-center w-full hover:bg-white/5"
            >
              <BsList />
              <p className="font-light text-[1rem]">All</p>
            </Link>
          </div>
          <Separator className="bg-white/10 my-2 w-[94%]" />
          <Accordion type="multiple" draggable className="w-full ">
            <AccordionItem value="Spaces" className="border-0 ">
              <AccordionTrigger className="text-white/60 hover:text-white pr-4 pl-9 border-0 outline-none hover:bg-white/5 py-3 h-auto hover:no-underline rounded-lg cursor-pointer">
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
              <AccordionTrigger className="text-white/60 hover:text-white pr-4 pl-9 border-0 outline-none hover:bg-white/5 py-3 h-auto hover:no-underline rounded-lg cursor-pointer">
                Recent
              </AccordionTrigger>
              <AccordionContent className="px-7 border-0 outline-none my-2">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="About" className="border-0 ">
              <AccordionTrigger className="text-white/60 hover:text-white pr-4 pl-9 border-0 outline-none hover:bg-white/5 py-3 h-auto hover:no-underline rounded-lg cursor-pointer">
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
