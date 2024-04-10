import Loading from "@/components/ui/Loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetForumById } from "@/features/hooks/global/forum/useGetForumById";
import { parseStringToHTML } from "@/utils/helpers/parse";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  Reply,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { commentOnForum } from "@/features/functions/forum/createComment";
import { useRecoilValue } from "recoil";
import { UserAtom } from "@/features/store/atom/user/user.atom";

const ForumById = () => {
  const { forumId } = useParams();
  const { forum, loading, setForum } = useGetForumById();
  const [comment, setComment] = useState<string>("");
  const userId = useRecoilValue(UserAtom)?.id;
  const [commenting, setCommenting] = useState(false);

  if (loading || forum === null) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  const description = parseStringToHTML(forum.description || "");

  const handleCommentSubmit = () => {
    if (!userId || !forumId || !comment) return;

    setCommenting(true);
    commentOnForum({ comment, forumId, userId })
      .then((data) => {
        console.log(data);
        if (data) {
          setForum({ ...forum, Comments: [data, ...forum.Comments] });
        }
        setCommenting(false);
      })
      .catch((err) => {
        console.log(err);
        setCommenting(false);
      });

    setComment("");
  };

  return (
    <div className="h-full w-full py-5">
      <ScrollArea className="h-full w-full flex justify-center items-center ">
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-full w-[70%]">
            <div className=""></div>
            <div className="font-sans mt-4 text-3xl font-extrabold">
              // {forum.title}
            </div>
            <div className="my-2 h-[4rem] w-full overflow-hidden flex items-center justify-between">
              <div className="h-full flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={forum.User.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="font-poppins text-white/60 items-start flex flex-col justify-center">
                  <p className="text-[1rem] font-semibold">{forum.User.name}</p>
                  <p className="text-sm font-light">{forum.User.email}</p>
                </div>
              </div>
              <div className="text-white/60">
                {moment(forum.createdAt).format("LLL")}
              </div>
            </div>
            <div className=" flex flex-wrap gap-2 w-full h-auto text-white mb-3">
              {forum.tags.map((tag) => {
                return (
                  <Badge variant="outline" className="text-black bg-white/90">
                    {tag}
                  </Badge>
                );
              })}
            </div>
            <div className="h-auto w-[56vw] bg-black p-4 rounded-md  my-2 text-white/65 ">
              {description}
            </div>
            <div className=" h-[3rem] w-full  flex text-white/70">
              <div className="w-1/2 h-full flex items-center gap-2">
                <div className="flex">
                  <ArrowBigUp className=" text-lg hover:text-blue-400 cursor-pointer hover:scale-110 duration-100" />
                  <p>30</p>
                </div>
                <div className="flex">
                  <ArrowBigDown className=" text-lg hover:text-blue-400 cursor-pointer hover:scale-110 duration-100" />
                  <p>90</p>
                </div>
              </div>
              <div className="w-1/2 h-full flex justify-end items-center gap-2">
                <div className="flex">
                  <Bookmark className="hover:text-yellow-400 cursor-pointer hover:scale-110 duration-100" />
                </div>
                <div className="flex">
                  <Share2 className="hover:text-rose-400 cursor-pointer hover:scale-105 duration-100" />
                </div>
              </div>
            </div>
            <div className="w-full flex gap-2 items-center justify-between font-kode-mono text-lg my-2 mt-4 overflow-hidden">
              <p>COMMENTS</p>
              <Separator className="w-[90%] bg-white/30" />
            </div>
            <div className=" flex mt-3  w-full gap-3">
              <Input
                value={comment}
                disabled={commenting}
                className="outline-none p-2 w-full h-full border-[.2px] border-white/30 focus-visible:ring-[2.4px] focus-within:border-[#E54D2E] focus-visible:ring-[#5E1C16] bg-white/5  rounded-md "
                placeholder="Search"
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                disabled={commenting}
                onClick={handleCommentSubmit}
                className="w-auto bg-white text-[1rem] font-medium hover:opacity-80 text-black px-3 rounded-md"
              >
                {commenting ? <Loading /> : "Comment"}
              </button>
            </div>
            <div className="min-h-[10vh] w-full mt-4">
              {forum.Comments.map((comment) => (
                <div className="min-h-[3rem] mb-10 w-[80%]  flex gap-2">
                  <div className="h-auto w-[5%] flex items-center justify-center ">
                    <img
                      src={comment.User?.image}
                      className="h-[2rem] rounded-full"
                    />
                  </div>
                  <div className="h-[30%] w-full flex flex-col  ">
                    <div className="flex gap-3">
                      <p className="text-white/85 font-semibold text-xs">
                        {comment.User.name}
                      </p>
                      <p className="text-xs text-white/60">
                        {moment(comment.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="flex justify-start text-white mt-2 items-center">
                      {comment.comment}
                    </div>
                    <div className="h-[10%] flex text-[1.1rem] gap-2 mt-2">
                      <AiOutlineLike className="hover:text-blue-500 duration-100 transition-all hover:scale-110 cursor-pointer" />
                      <BsReply className="hover:text-blue-500 duration-100 transition-all hover:scale-110 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ForumById;
