import Loading from "@/components/ui/Loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetForumById } from "@/features/hooks/global/forum/useGetForumById";
import { parseStringToHTML } from "@/utils/helpers/parse";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import {
  BiSolidDownvote,
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
} from "react-icons/bi";
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
import {
  CommentWithUser,
  commentOnForum,
} from "@/features/functions/forum/createComment";
import { useRecoilValue } from "recoil";
import { UserAtom } from "@/features/store/atom/user/user.atom";
import { Button } from "@/components/ui/button";
import {
  CommentReplyWithUser,
  replyToComment,
} from "@/features/functions/forum/replyToComment";
import { getRepliesToComment } from "@/features/functions/forum/getCommentReplies";
import { useGetUserForum } from "@/features/hooks/global/forum/useGetUserForum";
import { upVoteForum } from "@/features/functions/forum/vote/upvoteForum";
import { downVoteForum } from "@/features/functions/forum/vote/downvoteForum";
import { unDownVoteForum } from "@/features/functions/forum/vote/unDownvoteForum";
import { unUpVoteForum } from "@/features/functions/forum/vote/unUpvoteForum";
import { useGetComments } from "@/features/hooks/global/forum/useGetComments";

const ForumById = () => {
  const { forumId } = useParams();
  const { forum, loading, setForum } = useGetForumById();
  const [comment, setComment] = useState<string>("");
  const userId = useRecoilValue(UserAtom)?.id;
  const [commenting, setCommenting] = useState(false);
  const { userForum, setUserForum } = useGetUserForum();
  const { comments, setComments } = useGetComments();

  console.log(forum);

  if (loading || forum === null) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

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

  const description = parseStringToHTML(forum.description || "");

  const handleCommentSubmit = () => {
    if (!userId || !forumId || !comment) return;

    setCommenting(true);
    commentOnForum({ comment, forumId, userId })
      .then((data) => {
        if (data) {
          setComments((v) => [data, ...v]);
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
                <div className="flex items-center gap-1">
                  {userForum?.isUpvoted ? (
                    <BiSolidUpvote
                      onClick={handleUnUpvote}
                      className=" text-lg hover:text-blue-400 cursor-pointer hover:scale-110 duration-100"
                    />
                  ) : (
                    <BiUpvote
                      onClick={handleUpvote}
                      className=" text-lg hover:text-blue-400 cursor-pointer hover:scale-110 duration-100"
                    />
                  )}
                  <p>{forum.upvotes}</p>
                </div>
                <div className="flex items-center gap-1">
                  {userForum?.isDownvoted ? (
                    <BiSolidDownvote
                      onClick={handleUnDownvote}
                      className=" text-lg hover:text-blue-400 cursor-pointer hover:scale-110 duration-100"
                    />
                  ) : (
                    <BiDownvote
                      onClick={handleDownvote}
                      className=" text-lg hover:text-blue-400 cursor-pointer hover:scale-110 duration-100"
                    />
                  )}
                  <p>{forum.downvotes}</p>
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
              <p className="flex w-auto">COMMENTS {forum.Comments.length}</p>
              <Separator className="w-[85%] bg-white/30" />
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
              {comments.map((comment) => (
                <CommentsTSX comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

const CommentsTSX = ({ comment }: { comment: CommentWithUser }) => {
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState("");
  const userId = useRecoilValue(UserAtom)?.id;
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<CommentReplyWithUser[]>([]);
  const [replyLoad, setReplyLoad] = useState(false);

  useEffect(() => {
    if (showReplies) {
      setReplyLoad(true);
      getRepliesToComment({ commentId: comment.id })
        .then((data) => {
          setReplyLoad(false);
          if (data) {
            setReplies(data);
          } else {
            setReplies([]);
          }
        })
        .catch((err) => {
          setReplyLoad(false);
          console.log(err);
          setReplies([]);
        });
    } else {
      setReplies([]);
    }

    return () => {
      setReplies([]);
    };
  }, [showReplies]);

  const handleReply = () => {
    setIsReply((c) => !c);
  };

  const submitReply = () => {
    replyToComment({
      userId: userId!,
      commentId: comment.id,
      comment: reply,
    })
      .then((data) => {
        if (data) setReplies((v) => [data, ...v]);
      })
      .catch((err) => {
        console.log(err);
      });

    setReply("");
  };

  return (
    <div className="min-h-[3rem] mb-10 w-[80%]  flex gap-2 relative">
      <div className="h-auto w-[5%] flex items-start pt-3 justify-center ">
        <img src={comment.User?.image} className="h-[2rem] rounded-full" />
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
          {isReply ? (
            <RxCross2
              onClick={handleReply}
              className="hover:text-blue-500 duration-100 transition-all hover:scale-110 cursor-pointer"
            />
          ) : (
            <BsReply
              onClick={handleReply}
              className="hover:text-blue-500 duration-100 transition-all hover:scale-110 cursor-pointer"
            />
          )}
          <p
            onClick={() => setShowReplies((v) => !v)}
            className="text-white/55 text-xs ml-2 hover:text-blue-400 cursor-pointer"
          >
            {showReplies ? "Hide Replies" : "Show Replies"}
          </p>
        </div>
        {isReply && (
          <div className="h-auto w-full mt-2 pl-5 flex gap-2">
            <Input
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
              className=" w-[60%] outline-none border-0 ring-0 focus:ring-0 focus:border-0 focus-visible:outline-none focus:outline-none focus:border-b border-b rounded-none"
              placeholder="Reply"
            />
            <Button
              onClick={submitReply}
              className="bg-transparent text-white hover:bg-white hover:text-black"
            >
              Post
            </Button>
          </div>
        )}
        {showReplies &&
          (replyLoad ? (
            <div className="h-[5vh] w-[60%]">
              <Loading />
            </div>
          ) : (
            <div className="h-auto w-[60%] flex flex-col items-start justify-center mt-5 pl-5">
              {replies &&
                replies.map((reply) => (
                  <div className="h-auto w-full flex gap-2 mb-3">
                    <div className="h-full w-[10%]  flex items-start justify-center ">
                      <img
                        src={reply.User?.image}
                        className="h-[1.5rem] rounded-full"
                      />
                    </div>
                    <div className="h-[30%] w-full flex flex-col  ">
                      <div className="flex gap-3">
                        <p className="text-white/85 font-semibold text-xs">
                          {reply.User.name}
                        </p>
                        <p className="text-xs text-white/60">
                          {moment(reply.createdAt).fromNow()}
                        </p>
                      </div>
                      <div className="flex justify-start text-white mt-2 items-center">
                        {reply.comment}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ForumById;
