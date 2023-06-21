import dynamic from "next/dynamic";
import { CircularProgress } from "@material-ui/core";
import "react-quill/dist/quill.snow.css";
import { memo } from "react";

const Loader = () => {
  return <CircularProgress />;
};

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <Loader />,
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

type Props = {
  HandleChange: (value: string) => void;
};

const TextEditor = ({ HandleChange }: Props): JSX.Element => {
  return (
    <div className="flex h-[30%]">
      <QuillNoSSRWrapper
        modules={ToolbarView}
        theme="snow"
        onChange={HandleChange}
      />
    </div>
  );
};

export default memo(TextEditor);
