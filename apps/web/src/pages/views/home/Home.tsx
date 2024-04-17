import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import "@/utils/styles/scroll-bar.css";
import _ from "lodash";
import { forumsOrderAtom } from "@/features/store/atom/global/forumsOrder.atom";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { forumsOrder } from "types";
import { useGetForums } from "@/features/hooks/global/forum/useGetForums";
import Loading from "@/components/ui/Loading";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ForumWithUser } from "@/features/functions/forum/getAllForums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetUserForumByPass } from "@/features/hooks/global/forum/useGetUserForum";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  BiComment,
  BiDownvote,
  BiShare,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { upVoteForum } from "@/features/functions/forum/vote/upvoteForum";
import { downVoteForum } from "@/features/functions/forum/vote/downvoteForum";
import { unDownVoteForum } from "@/features/functions/forum/vote/unDownvoteForum";
import { unUpVoteForum } from "@/features/functions/forum/vote/unUpvoteForum";
import { bookMarkForum } from "@/features/functions/forum/vote/bookmarkForum";
import { unBookMarkForum } from "@/features/functions/forum/vote/unbookmark.Forum";
import { parseStringToHTML } from "@/utils/helpers/parse";

export const nav = [
  { value: forumsOrder.recent, name: _.upperFirst(forumsOrder.recent) },
  { value: forumsOrder.relevant, name: _.upperFirst(forumsOrder.relevant) },
  { value: forumsOrder.trending, name: _.upperFirst(forumsOrder.trending) },
];

export const forumOptions = [];

const Home = () => {
  const [orderby, setOrderby] = useRecoilState(forumsOrderAtom);
  const { forums, loading } = useGetForums();

  return (
    <div className="h-full w-full flex justify-center items-center gap-3 p-2">
      <div className="w-[50%] pr-3 py-3 overflow-y-scroll flex flex-col items-center justify-center scroll-ui h-full">
        <div className=" h-full w-full">
          <div className="h-[3vh] w-full">
            <NavFilter filter={orderby} setFilter={setOrderby} />
          </div>
          <Separator className="my-2 bg-darkwhite " />
          <div className="h-auto w-full mt-3 ">
            {loading ? (
              <div className="h-full w-full">
                <Loading />
              </div>
            ) : (
              <div className="h-full w-full ">
                {forums.map((forum) => (
                  <Forum forum={forum} key={forum.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[20%] h-full rounded-xl py-8">
        <div className="h-full w-full rounded-2xl bg-black/45 "></div>
      </div>
    </div>
  );
};

const Forum = ({ forum }: { forum: ForumWithUser }) => {
  const [forumz, setForum] = useState(forum);
  const { userForum, loading, setUserForum } = useGetUserForumByPass({
    forumId: forum.id,
  });

  const forumId = forum.id;

  const handleUpvote = () => {
    if (forumId) {
      upVoteForum({ forumId }).then((data) => {
        if (data) {
          console.log(data);
          setUserForum(data);
          setForum(data.Forum);
        }
      });
    }
  };
  const handleDownvote = () => {
    if (forumId) {
      downVoteForum({ forumId }).then((data) => {
        if (data) {
          setUserForum(data);
          setForum(data.Forum);
        }
      });
    }
  };
  const handleUnDownvote = () => {
    if (forumId && userForum) {
      unDownVoteForum({ forumId, userForumId: userForum.id }).then((data) => {
        if (data) {
          setUserForum(data);
          setForum(data.Forum);
        }
      });
    }
  };
  const handleUnUpvote = () => {
    if (forumId && userForum) {
      unUpVoteForum({ forumId, userForumId: userForum.id }).then((data) => {
        if (data) {
          setUserForum(data);
          setForum(data.Forum);
        }
      });
    }
  };
  const handleBookMark = () => {
    bookMarkForum({ forumId: forum.id })
      .then((data) => {
        setUserForum(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUnBookMark = () => {
    unBookMarkForum({ forumId: forum.id })
      .then((data) => {
        setUserForum(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const description = parseStringToHTML(forum.description || " ");

  return (
    <>
      <div className="hover:bg-white/5 p-2 min-h-[40vh] flex flex-col justify-between items-center w-full rounded-lg   ">
        <div className="w-full flex justify-between items-center">
          <div className="text-xl font-bold font-poppins flex gap-2">
            <div className="h-[2rem] cursor-pointer bg-white/10 rounded-full overflow-hidden p-1  w-auto">
              <img src={forum.User.image} className="h-full rounded-full" />
            </div>
            <div className="h-[2rem] text-sm font-normal  w-auto flex flex-col justify-center items-start">
              <p>{forum.User.name}</p>
              <p className="text-[10px] text-white/50">{forum.User.email}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" h-[2rem] cursor-pointer outline-none border-0 focus: ring-0 focus:border-0 focus:outline-none">
              <HiOutlineDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[5rem] min-h-[2rem] bg-black border-0 shadow-lg text-white p-2 text-md font-poppins"
              align="end"
            >
              Few Options
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full h-[30vh] py-1">
          <p className="font-poppins text-lg  font-bold">{forum.title}</p>
          <div className="h-[25vh] overflow-hidden w-full">{description}</div>
        </div>
        <div className="w-full h-auto flex gap-2">
          <div className="font-poppins text-white w-[4.5rem] h-[2rem] flex overflow-hidden rounded-2xl bg-white/20">
            {userForum ? (
              userForum.isUpvoted === false &&
              userForum.isDownvoted === false ? (
                <>
                  <div
                    onClick={handleUpvote}
                    className={cn(
                      "bg-white/20  h-full rounded-2xl relative cursor-pointer flex  items-center hover:opacity-80",
                      "w-[65%] flex justify-center"
                    )}
                  >
                    <BiUpvote />
                    <p>{forumz.upvotes}</p>
                  </div>
                  <div
                    onClick={handleDownvote}
                    className={cn(
                      "h-full rounded-2xl relative cursor-pointer flex  items-center hover:opacity-80",
                      "w-[35%] flex justify-center pr-1 "
                    )}
                  >
                    <BiDownvote />
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={
                      userForum.isUpvoted ? handleUnUpvote : handleUpvote
                    }
                    className={cn(
                      "  h-full rounded-2xl relative cursor-pointer flex  items-center hover:opacity-80",
                      userForum.isUpvoted
                        ? "w-[65%] bg-rose-600 z-20 px-2 justify-start font-bold"
                        : "w-[35%] flex justify-center"
                    )}
                  >
                    {userForum.isUpvoted ? <BiSolidUpvote /> : <BiUpvote />}
                    {userForum.isUpvoted && <p>{forumz.upvotes}</p>}
                  </div>
                  <div
                    onClick={
                      userForum.isDownvoted ? handleUnDownvote : handleDownvote
                    }
                    className={cn(
                      "  h-full rounded-2xl relative cursor-pointer flex  items-center hover:opacity-80 gap-1",
                      userForum?.isDownvoted
                        ? "w-[65%] bg-yellow-500 z-20 px-1 justify-center gap-1 font-bold"
                        : "w-[35%] flex justify-center pr-1 "
                    )}
                  >
                    {userForum.isDownvoted ? (
                      <BiSolidDownvote />
                    ) : (
                      <BiDownvote />
                    )}
                    {userForum.isDownvoted && <p>{forumz.downvotes}</p>}
                  </div>
                </>
              )
            ) : (
              <>
                <div
                  className={cn(
                    "  h-full w-[70%] bg-white/15 justify-center rounded-2xl relative cursor-pointer flex  items-center hover:opacity-80"
                  )}
                  onClick={handleUpvote}
                >
                  <BiUpvote />
                  <p>{forumz.upvotes}</p>
                </div>
                <div
                  className={cn(
                    "  h-full w-[30%] rounded-2xl relative cursor-pointer flex justify-center  items-center hover:opacity-80 "
                  )}
                  onClick={handleDownvote}
                >
                  <BiDownvote />
                </div>
              </>
            )}
          </div>
          <div className="cursor-pointer hover:opacity-70 font-bold h-full w-auto px-2 py-1 bg-white/20 rounded-2xl flex gap-1 items-center justify-center">
            <BiComment />
            <p>{forum.Comments.length}</p>
          </div>
          <div className="cursor-pointer hover:opacity-70 font-bold h-full w-auto px-2 py-1 bg-white/20 rounded-2xl flex gap-1 items-center justify-center">
            <BiShare />
            <p>Share</p>
          </div>
        </div>
      </div>
      <Separator className="my-2 bg-darkwhite" />
    </>
  );
};

export const NavFilter = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: SetterOrUpdater<string>;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="h-full w-auto flex">
        <Select value={filter} onValueChange={(v) => setFilter(v)}>
          <SelectTrigger
            value={filter}
            className="font-sans ring-0 focus:ring-0 focus:border-0 outline-none border-0 gap-4"
          >
            {filter ? _.upperFirst(filter) : "Filter Posts"}
          </SelectTrigger>
          <SelectContent className="bg-black/80 text-white border-0">
            {nav.map((v) => (
              <SelectItem
                value={v.value}
                className="hover:bg-white/5 cursor-pointer"
              >
                {v.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-full w-auto"></div>
    </div>
  );
};

export default Home;
