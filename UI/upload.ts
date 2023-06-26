import { generateComponents } from "@uploadthing/react";
import { OurFileRouter } from "@pages/api/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
