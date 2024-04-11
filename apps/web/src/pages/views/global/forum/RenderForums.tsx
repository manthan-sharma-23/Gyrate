import { ForumWithUser } from "@/features/functions/forum/getAllForums";
import { useGetForums } from "@/features/hooks/global/forum/useGetForums";
import { parseStringToHTML } from "@/utils/helpers/parse";
import moment from "moment";
import { FaCircle } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { GoShareAndroid } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import { Badge } from "@/components/ui/badge";

const RenderForums = () => {
  const { forums, loading } = useGetForums();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {forums.map((forum) => (
        <Forum key={forum.id} forum={forum} />
      ))}
    </div>
  );
};

const Forum = ({ forum }: { forum: ForumWithUser }) => {
  const description = parseStringToHTML(forum.description || "");
  const navigate = useNavigate();

  return (
    <div
      key={forum.id}
      onClick={() => {
        navigate(forum.id);
      }}
      className="h-auto w-full mb-5 border p-1 border-white/40 cursor-pointer  hover:border-brightorange/55 transition-all"
    >
      <div className="min-h-[20vh] w-full border  border-white/15 font-kode-mono p-2 px-3">
        <div className="w-full  min-h-[2.5rem] text-xl font-bold flex justify-between items-center">
          <p>// {forum.title}</p>
        </div>
        <div className="h-[2rem] py-1">
          <div className="h-full w-full flex justify-between gap-2 text-sm text-white/65">
            <div className="h-full flex gap-2">
              <img
                src={forum.User.image}
                className="h-full rounded-full opacity-80"
              />
              <p className="h-full items-center flex  font-semibold">
                {forum.User.name}
              </p>
            </div>
            <p>{moment(forum.createdAt).fromNow()}</p>
          </div>
        </div>
        <div className="h-auto w-auto flex flex-wrap gap-2 my-1 font-poppins">
          {forum.tags &&
            forum.tags.map((tag) => (
              <Badge className="bg-white/80 text-black">{tag}</Badge>
            ))}
        </div>
        <div className="bg-black p-2 rounded-md h-[6rem] overflow-hidden text-sm text-white/60 mt-4">
          {description}
        </div>
        <div className="h-[2rem] flex justify-between items-center overflow-hidden text-sm text-white/60 mt-3">
          <div className="w-1/2 h-full flex items-center font-sans gap-1">
            <p className="hover:text-yellow-400 duration-100 text-blue-500">
              0 Upvotes
            </p>
            <FaCircle className="text-[4px] text-white/30" />
            <p className="hover:text-yellow-400 duration-100 text-blue-500">
              0 Comments
            </p>
          </div>
          <div className="w-1/2 h-full flex items-center justify-end text-lg font-sans gap-3">
            <IoBookmarkOutline className="hover:scale-[1.08] transition-all duration-100 hover:text-yellow-400" />
            <GoShareAndroid className="hover:scale-[1.15] transition-all duration-100 hover:text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderForums;
