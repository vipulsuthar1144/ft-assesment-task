import { Pencil, Trash2 } from "lucide-react";

interface ITabbleActionButton {
  onEyeClick?: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  showButton?: "ALL" | "EDIT" | "DELETE";
}

const TableActionButton = ({
  //   onEyeClick,
  onEditClick,
  onDeleteClick,
  showButton = "ALL",
}: ITabbleActionButton) => {
  return (
    <div className="flex items-center gap-2 ">
      {/* <button
        onClick={onEyeClick}
        className="p-2 rounded-md bg-gray-200 text-gray-800"
        aria-label="View"
      >
        <Eye size={20} />
      </button> */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEditClick();
        }}
        className={`p-2 ${showButton == "DELETE" && "hidden"} text-xs font-medium px-5   rounded-sm bg-green-100 text-green-800`}
        aria-label="Update"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
        className={`p-2 ${showButton == "EDIT" && "hidden"} text-xs rounded-sm font-medium px-5 bg-red-100 text-red-800`}
        aria-label="Delete"
      >
        Delete
      </button>
    </div>
  );
};

export default TableActionButton;
