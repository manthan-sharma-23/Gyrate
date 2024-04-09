import { Separator } from "@/components/ui/separator";
import { UserAtom } from "@/features/store/atom/user/user.atom";
import { Forum } from "@prisma/client";
import { useRecoilValue } from "recoil";
import RichTextEditor from "@/components/elements/RichTextEditor";
import { useState } from "react";
import { createForum } from "@/features/functions/forum/createForum";
import { forumTags } from "@/utils/helpers/tags";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import "@/utils/styles/scroll-bar.css"

const CreateForum = () => {
  const user = useRecoilValue(UserAtom);
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [forum, setForum] = useState<Partial<Forum>>({
    title: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = () => {
    if (!forum.title || !description) return;

    setLoading(true);
    createForum({ title: forum.title, description, tags })
      .then(() => {
        setLoading(false);
        setForum({});
        setDescription("");
        setTags([]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="overflow-y-scroll scroll-ui h-[100vh] w-full flex justify-center items-center ">
      <div className="h-full w-full flex justify-start items-center p-3">
        <div className="w-[60%] h-full pl-10 mr-[3vw]">
          <div className="h-[10vh] flex w-full text-2xl">
            <p className="h-[10vh] flex items-center  font-kode-mono text-white">
              &#35;
            </p>
            <input
              disabled={loading}
              className="text-white/75 font-semibold px-3 h-full w-full outline-none bg-transparent font-poppins placeholder:text-white/40"
              placeholder="Enter Title Here"
              value={forum?.title}
              onChange={(e) => {
                setForum((v) => ({ ...v, title: e.target.value }));
              }}
            />
          </div>
          <Separator className="bg-white/10 mb-2" />
          <div className="w-full h-[6vh] flex justify-between items-center">
            <div className="h-full flex justify-start items-center gap-2 font-kode-mono">
              <img
                src={user?.image}
                className="h-[80%] rounded-full p-1 opacity-75"
              />
              <div className="font-sans flex flex-col justify-center items-start">
                <p className="text-md font-semibold text-white/60">
                  {user?.name}
                </p>
                <p className="text-sm font-normal text-white/40">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-[10vh] flex flex-col mt-2 w-full ">
            <RichTextEditor value={description} setValue={setDescription} />
          </div>
          <div className="h-[10vh] w-full flex justify-end items-center">
            <button
              disabled={loading}
              onClick={onSubmitHandler}
              className="hover:opacity-60 w-auto h-auto py-1 font-medium rounded-md text-lg font-kode-mono px-3 bg-white text-black "
            >
              CREATE FORUM
            </button>
          </div>
        </div>
        <div className="h-[90vh] w-[30%]">
          <div className="h-1/2 w-full">
            <Tags tags={tags} setTags={setTags} />
          </div>
          <div className="h-1/2 w-full"></div>
        </div>
      </div>
    </div>
  );
};

const Tags = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  // Function to handle selecting a tag
  const handleTagClick = (tagName: string) => {
    if (tags.includes(tagName)) {
      // If tag is already selected, remove it
      setTags(tags.filter((tag) => tag !== tagName));
    } else {
      // Otherwise, add it to the selected tags
      setTags([...tags, tagName]);
    }
  };

  // Filter out selected tags from forumTags
  const filteredForumTags = forumTags.filter((tag) => !tags.includes(tag.name));

  return (
    <div className="h-full w-full rounded-lg">
      <div className="h-[2.5rem]">
        <Input
          className="w-full h-full border-[.2px] border-white/30 focus-visible:ring-[1.7px] focus-within:border-[#E54D2E] focus-visible:ring-[#5E1C16] bg-white/5  rounded-md "
          placeholder="Search for tags"
        />
      </div>
      <div className="h-[80vh] w-full overflow-hidden">
        <p className="mt-3 text-lg font-poppins text-white/70 mb-1">
          Selected Tags
        </p>
        <ScrollArea className="overflow-hidden w-full pr-10">
          <div className="w-full h-auto flex flex-wrap ">
            {/* Display selected tags */}
            {tags.map((tagName) => (
              <div
                key={tagName}
                onClick={() => handleTagClick(tagName)}
                className="hover:bg-white/5 cursor-pointer selected-tag h-auto w-auto border px-2 py-[2px] mr-2 mb-2 rounded-md border-purple-300 text-purple-300"
              >
                {tagName}
              </div>
            ))}
          </div>
        </ScrollArea>
        <p className="mt-3 text-lg font-poppins text-white/70 mb-1">
          Selected Tags
        </p>
        <ScrollArea className="h-[60vh] overflow-hidden pr-10">
          <div className="flex flex-wrap gap-2 mt-3 relative z-30">
            {filteredForumTags.map((tag) => (
              <div
                key={tag.name}
                onClick={() => handleTagClick(tag.name)}
                style={{ borderColor: tag.color, color: tag.color }}
                className="h-auto w-auto px-2 rounded-md py-[2px] border mr-1 mb-1 hover:bg-white/5 cursor-pointer"
              >
                {tag.name}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CreateForum;
