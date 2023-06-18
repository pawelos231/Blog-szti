import { DESCRIPTION_URL } from "@constants/apisEndpoints";
import { POST } from "@constants/reqMeth";
import { MutableRefObject, forwardRef, useRef } from "react";

interface DescriptionComponentProps {
  viewModal: boolean;
  setViewModal: (value: boolean) => void;
  description: string;
  setDescription: (value: any) => void;
}

const DescriptionComponentCurrent = ({
  viewModal,
  setViewModal,
  description,
  setDescription,
}: DescriptionComponentProps) => {
  const DESC_REF: MutableRefObject<HTMLTextAreaElement> = useRef(null);

  const sendDescription = async (): Promise<void> => {
    const token = localStorage.getItem("profile");
    const descriptionLength = String(DESC_REF.current.value).trim().length;

    if (descriptionLength === 0) return;

    await fetch(DESCRIPTION_URL, {
      method: POST,
      body: JSON.stringify(String(DESC_REF.current.value)),
      headers: {
        Authorization: token,
      },
    })
      .then((res: Response) => res.json())
      .then((descriptionRes: any) => {
        setDescription(descriptionRes);
        setViewModal(true);
      });
  };

  return (
    <>
      {" "}
      {viewModal ? (
        <div className="w-[40%] h-[30%]">
          {!description || description.length === 0 ? (
            <div className=" text-center m-2 h-[90%] rounded-sm flex justify-center items-center">
              <p className="text-xl text-white">napisz tu coś...</p>
            </div>
          ) : (
            <div className=" text-center m-2 h-[90%]  border-white rounded-sm flex justify-center items-center">
              {description}
            </div>
          )}
          <div
            className="p-2 w-full text-end cursor-pointer transition hover:scale-105"
            onClick={() => setViewModal(!viewModal)}
          >
            Dodaj opis
          </div>
        </div>
      ) : (
        <>
          <textarea ref={DESC_REF} className="w-[30%] h-[30%] p-2"></textarea>
          <div className="flex">
            <button
              onClick={() => setViewModal(true)}
              className="p-2 text-end hover:text-red-500"
            >
              Anuluj
            </button>
            <button
              onClick={() => sendDescription()}
              className="p-2 text-end hover:text-green-500"
            >
              Dodaj!
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DescriptionComponentCurrent;
