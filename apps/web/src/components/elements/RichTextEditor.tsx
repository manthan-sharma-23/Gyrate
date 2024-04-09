import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ScrollArea } from "../ui/scroll-area";

const RichTextEditor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const toolBarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ];
  const module = {
    toolbar: toolBarOptions,
  };

  return (
    <ReactQuill
      placeholder="Enter you text here"
      modules={module}
      theme="snow"
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      className="text-white bg-transparent placeholder:text-white"
    />
  );
};

export default RichTextEditor;
