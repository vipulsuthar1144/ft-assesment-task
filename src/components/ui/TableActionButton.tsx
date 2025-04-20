import { LoaderButton } from "./LoaderButton";

interface ITabbleActionButton {
  onEyeClick?: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleteLoading?: boolean
}

const TableActionButton = ({
  //   onEyeClick,
  onEditClick,
  onDeleteClick,
  isDeleteLoading = false
}: ITabbleActionButton) => {
  return (
    <div className="flex items-center gap-2 ">
     
       <LoaderButton
      color="success"
      label="Edit"
       onClick={onEditClick}
          className={`p-2 md:text-xs rounded-sm font-medium px-5`}
      />

      <LoaderButton
      color="danger"
      label="Delete"
       onClick={onDeleteClick}
          className={`p-2 md:text-xs rounded-sm font-medium px-5 w-20`}
     isLoading={isDeleteLoading}
      />
    </div>
  );
};

export default TableActionButton;
