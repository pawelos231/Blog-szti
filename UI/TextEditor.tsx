import dynamic from "next/dynamic";
import { CircularProgress } from "@material-ui/core";
import "react-quill/dist/quill.snow.css";
import { memo } from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <CircularProgress />,
});

const ToolbarView = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const TextEditor = ({ handleMessage }): JSX.Element => {
  return (
    <div className="flex h-[30%]">
      <QuillNoSSRWrapper
        modules={ToolbarView}
        theme="snow"
        onChange={handleMessage}
      />
    </div>
  );
};

export default memo(TextEditor);
