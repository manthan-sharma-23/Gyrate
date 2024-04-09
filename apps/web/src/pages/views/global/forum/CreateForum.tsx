import { Separator } from "@/components/ui/separator";
import { UserAtom } from "@/features/store/atom/user/user.atom";
import { Forum } from "@prisma/client";
import { useRecoilValue } from "recoil";
import moment from "moment";
import RichTextEditor from "@/components/elements/RichTextEditor";
import { useState } from "react";
import { createForum } from "@/features/functions/forum/createForum";

const CreateForum = () => {
  const user = useRecoilValue(UserAtom);
  const [description, setDescription] = useState<string>("");
  const [forum, setForum] = useState<Partial<Forum>>({
    title: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = () => {
    if (!forum.title || !description) return;

    setLoading(true);
    createForum({ title: forum.title, description })
      .then((_data) => {
        setLoading(false);
        setForum({});
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="h-full w-full flex justify-start items-center p-3">
      <div className="w-[70%] h-full ml-[5vw]">
        <div className="h-[10vh] flex w-full text-2xl">
          <p className="h-[10vh] flex items-center  font-kode-mono text-brightorange">
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
        <div className="w-full h-[5vh] flex justify-between items-center">
          <div className="h-full flex justify-start items-center gap-2 font-kode-mono">
            <img
              src={user?.image}
              className="h-[80%] rounded-full p-1 opacity-75"
            />
            <p className="text-lg font-semibold text-white/60">{user?.name}</p>
            <p className="text-sm font-semibold text-white/40 ml-3">
              {user?.email}
            </p>
          </div>
          <p className="text-white/70">{moment(Date.now()).format("LLL")}</p>
        </div>
        <div className="h-[70vh] flex flex-col mt-2 w-full bg-white/5 border border-white/30">
          <RichTextEditor value={description} setValue={setDescription} />
        </div>
        <div className="h-[10vh] w-full flex justify-end items-center">
          <button
            disabled={loading}
            onClick={onSubmitHandler}
            className="hover:opacity-60 w-auto h-auto py-2 text-xl font-kode-mono px-4 bg-darkbrown border border-darkorange text-brightorange"
          >
            CREATE FORUM
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForum;
