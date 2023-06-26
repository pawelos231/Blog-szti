import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@pages/api/uploadthing";
import { useState, useCallback } from "react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  console.log(files);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: (e) => {
      console.log(e);
      console.log(isUploading);
      alert("error occurred while uploading");
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        {files.length > 0 && (
          <button onClick={() => startUpload(files)}>
            Upload {files.length} files
          </button>
        )}
      </div>
      Drop files here!
    </div>
  );
}
