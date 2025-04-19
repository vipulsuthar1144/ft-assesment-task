import FallbackError from "@fallback/FallbackError";
import { IArticleSchema } from "@schemas/article.schema";
import { useAppDispatch, useAppSelector } from "@store/store";
import { ArticleAPI } from "@store/thunk-services/article.thunk";
import DataTable from "@ui/DataTable";
import Image from "@ui/Image";
import { LoaderButton } from "@ui/LoaderButton";
import TableActionButton from "@ui/TableActionButton";
import { ITEM_PER_PAGE } from "@utils/api-constant";
import toastUtils from "@utils/toast";
import { Plus, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import ArticleForm from "./DialogArticle";


const Articles = () => {
  const dispatch = useAppDispatch();
  const {
    isArticleLoading,isArticleCRUDLoading,isArticleError,articleList,articleListMetaData
  } = useAppSelector((state) => state.article);
  const [selectedAction, setSelectedAction] = useState<"add" | "edit" >("add");
  const [dialog, toggleDialog] = useState({
    openConfirmationDialog: false,
    openCreateUpdateDialog: false,
  });

  const [selectedData, setSelectedData] = useState<IArticleSchema | null>(null)

  useEffect(() => {
    handleGetAllItemsAPICall();
  }, [dispatch]);

  const handleGetAllItemsAPICall = (page: number = articleListMetaData?.page ?? 1) => {
    dispatch(
      ArticleAPI.getAll({
        limit: ITEM_PER_PAGE,
        page: page,
      })
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
  const listenerOnEditButton = (data: IArticleSchema) => {
    setSelectedAction("edit");
   setSelectedData(data)
    toggleDialog((pre) => ({
      ...pre,
      openCreateUpdateDialog: true,
    }));
  };
  const listenerOnDeleteButton = async(data: IArticleSchema) => {
   if(data._id) { 
    await dispatch(ArticleAPI.deleteById(data._id)).unwrap()

toastUtils.success("Article Deleted")
   }
  };
 

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (_: string, row: IArticleSchema) => (
         <Image
        highResSrc={row.image ?? ""}
        alt="Article"
        className="w-12 h-12 rounded object-cover"
      />
      ),
    },
    { key: "title", label: "Title", render:(value:string)=>(
      <div className="flex min-w-[200px] max-w-[400px] text-wrap">
          <span>{value}</span>
        </div>
    ) },
    { key: "description", label: "description",render:(value:string)=>(
      <div className="flex min-w-[200px] text-wrap whitespace-break-spaces ">
          <span>{value}</span>
        </div>
    )  },
    {
      key: "id",
      label: "Operations",
      render: (_: string, data: IArticleSchema) => (
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
 
  if (isArticleError && !isArticleCRUDLoading) {
    return <FallbackError type="something_went_wrong" />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
       
        <ArticleForm 
        open={dialog.openCreateUpdateDialog}
        onClose={()=>{toggleDialog((pre) => ({
      ...pre,
      openCreateUpdateDialog: false,
    }))}}
        mode={selectedAction=="edit" ? "edit" : "create"}
        defaultValues={{
          description: selectedData?.description ?? "",
          title: selectedData?.title ?? "",
          imageUrl: selectedData?.image ?? "",
          id: selectedData?._id
        }}
        />
        <h1 className={`text-3xl font-medium`}>Articles</h1>
        <div className="flex gap-4">

        <LoaderButton StartIcon={Plus} label="Add new articles" className=" md:text-sm font-normal rounded-md" onClick={listenerOnAddButton} />
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
          data={articleList}
          totalItems={articleListMetaData.totalDocs ?? 0}
          currentPage={articleListMetaData.page ?? 1}
          totalPages={articleListMetaData.totalPages ?? 1}
          onPageChange={(page) => {
            handleGetAllItemsAPICall(page);
          }}
          isLoading={isArticleLoading}
        />
      </div>
    </>
  );
};

export default Articles;
