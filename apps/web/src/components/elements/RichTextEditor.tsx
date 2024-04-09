import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    ["link", "image"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ];
  const module = {
    toolbar: toolBarOptions,
  };

  return (
    <ReactQuill
      modules={module}
      theme="snow"
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      className="text-white h-[93.5%]"
    />
  );
};

export default RichTextEditor;
