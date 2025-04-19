import { CircleAlert, NotepadText } from "lucide-react";

type TErrorComponentType = "something_went_wrong" | "data_not_found";

interface IFallbackErrorProps {
  type: TErrorComponentType;
  message?: string;
  description?: string;
}

const FallbackError = ({
  type,
  message = "",
  description = "",
}: IFallbackErrorProps) => {
  if (type === "something_went_wrong") {
    return (
      <div className="w-full h-[50vh] bg-white grid place-content-center rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md h-auto text-center p-4 m-auto">
          <CircleAlert size={"50px"} className="text-red-600" />
          <h1 className="text-xl font-bold">
            {message || "Something went wrong."}
          </h1>
          <p className="text-sm">
            {description ||
              "Oops! It seems there was a problem with the server. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (type === "data_not_found") {
    return (
      <div className="flex  flex-col items-center justify-center gap-4 w-full max-w-md h-auto text-center p-4 m-auto">
        <NotepadText size={"70px"} />
        <h1 className="text-3xl font-bold">{message || "Empty Data"}</h1>
        <p className="text-lg">
          {description ||
            "The data you're looking for might not be available. Please try something else."}
        </p>
      </div>
    );
  }
  return null;
};

export default FallbackError;
