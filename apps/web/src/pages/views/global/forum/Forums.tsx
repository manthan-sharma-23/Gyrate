import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MdOutlineCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RenderForums from "./RenderForums";

const Forums = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col justify-start items-start  py-5 pl-[10vw]">
      <div className="h-auto w-[60%]">
        <section
          onClick={() => {
            navigate("/global/forums/create");
          }}
          className="cursor-pointer hover:text-white hover:border-darkorange font-kode-mono justify-between items-center flex px-5 text-white/70 h-[5.5vh] w-full bg-white/5 border-darkbrown border-2 my-4 rounded-sm"
        >
          <div className=" font-bold flex gap-4">
            <p>/// CREATE POST</p>
            <p className="text-white/10">
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            </p>
          </div>
          <div>
            <MdOutlineCreate />
          </div>
        </section>
      </div>
      <ScrollArea className="h-full w-full mt-2">
        <div className="h-full w-full p-0  flex justify-start items-center">
          <div className="h-full w-[60%] flex flex-col justify-start items-center">
            <section className="h-[5vh] w-full flex justify-between items-center gap-2  border-white/35">
              <div className="h-full w-[30vw]">
                <ul className="flex gap-4 h-full w-full justify-start items-center text-white/60">
                  <li className="h-auto w-auto flex justify-center text-brightorange  items-center py-1 rounded-md px-3 cursor-pointer">
                    Recent
                  </li>
                  <li className="h-auto w-auto flex justify-center items-center py-1 rounded-md px-3 cursor-pointer">
                    Relevent
                  </li>
                  <li className="h-auto w-auto flex justify-center items-center py-1 rounded-md px-3 cursor-pointer">
                    Trending
                  </li>
                </ul>
              </div>
              <Input
                className="w-[25vw] h-full border-[.2px] border-white/30 focus-visible:ring-[2.4px] focus-within:border-[#E54D2E] focus-visible:ring-[#5E1C16] bg-white/5  rounded-md "
                placeholder="Search"
              />
            </section>
            <div className="h-auto w-full mt-5">
              <RenderForums />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Forums;
