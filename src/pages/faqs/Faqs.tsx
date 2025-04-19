import FallbackError from "@fallback/FallbackError";
import { IFaqsSchema } from "@schemas/faqs.schema";
import { useAppDispatch, useAppSelector } from "@store/store";
import { FaqsAPI } from "@store/thunk-services/faqs.thunk";
import DataTable from "@ui/DataTable";
import { LoaderButton } from "@ui/LoaderButton";
import TableActionButton from "@ui/TableActionButton";
import toastUtils from "@utils/toast";
import { Plus, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import FaqsForm from "./DialogFaqs";


const Faqs = () => {
  const dispatch = useAppDispatch();
  const {
    isFaqsLoading,isFaqsCRUDLoading,isFaqsError,faqsList
  } = useAppSelector((state) => state.faqs);
  const [selectedAction, setSelectedAction] = useState<"add" | "edit" >("add");
  const [dialog, toggleDialog] = useState({
    openConfirmationDialog: false,
    openCreateUpdateDialog: false,
  });

  const [selectedData, setSelectedData] = useState<IFaqsSchema | null>(null)

  useEffect(() => {
    handleGetAllItemsAPICall();
  }, [dispatch]);

  const handleGetAllItemsAPICall = () => {
    dispatch(
      FaqsAPI.getAll()
    );
  };
  
  // const resetState = () => {
  //   setSelectedAction("add");
  //   setSelectedData(null)
  //   toggleDialog({
  //     openConfirmationDialog: false,
  //     openCreateUpdateDialog: false,
  //   });
  // };
  const listenerOnAddButton = () => {
    setSelectedAction("add");
   setSelectedData(null)
    toggleDialog((pre) => ({
      ...pre,
      openCreateUpdateDialog: true,
    }));
  };
  const listenerOnEditButton = (data: IFaqsSchema) => {
    setSelectedAction("edit");
   setSelectedData(data)
    toggleDialog((pre) => ({
      ...pre,
      openCreateUpdateDialog: true,
    }));
  };
  const listenerOnDeleteButton = async(data: IFaqsSchema) => {
   if(data._id) { 
    await dispatch(FaqsAPI.deleteById(data._id)).unwrap()

toastUtils.success("Faqs Deleted")
   }
  };
 

  const columns = [
    
    { key: "question", label: "Question", render:(value:string)=>(
      <div className="flex min-w-[300px] text-wrap whitespace-break-spaces">
          <span>{value}</span>
        </div>
    ) },
    { key: "answer", label: "Answer",render:(value:string)=>(
      <div className="flex min-w-[200px] text-wrap whitespace-break-spaces ">
          <span>{value}</span>
        </div>
    )  },
    {
      key: "id",
      label: "Operations",
      render: (_: string, data: IFaqsSchema) => (
        <TableActionButton
          onEyeClick={() => {}}
          onDeleteClick={() => {
            listenerOnDeleteButton(data);
          }}
          onEditClick={() => {
            listenerOnEditButton(data);
          }}
        />
      ),
    },
  ];
 
  if (isFaqsError && !isFaqsCRUDLoading) {
    return <FallbackError type="something_went_wrong" />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
       
        <FaqsForm 
        open={dialog.openCreateUpdateDialog}
        onClose={()=>{toggleDialog((pre) => ({
      ...pre,
      openCreateUpdateDialog: false,
    }))}}
        mode={selectedAction=="edit" ? "edit" : "create"}
        defaultValues={{
          answer: selectedData?.answer ?? "",
          question: selectedData?.question ?? "",
          id: selectedData?._id
        }}
        />
        <h1 className={`text-3xl font-medium`}>FAQ's</h1>
        <div className="flex gap-4">

        <LoaderButton StartIcon={Plus} label="Add new faqs" className=" md:text-sm font-normal rounded-md" onClick={listenerOnAddButton} />
        <button
        
        className={`p-3 aspect-square text-xs rounded-sm font-medium  bg-red-100 text-red-800`}
        aria-label="Delete"
      >
       <Trash2Icon size={20} />
      </button>
        </div>
      </div>
      <div className={`rounded-lg`}>  
        <DataTable
          columns={columns}
          data={faqsList}
          hasPaginations={false}
          totalItems={faqsList.length}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {
          }}
          isLoading={isFaqsLoading}
        />
      </div>
    </>
  );
};

export default Faqs;
