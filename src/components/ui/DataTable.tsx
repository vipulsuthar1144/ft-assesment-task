import AppLoader from "@components/AppLoader";
import { ITEM_PER_PAGE } from "@utils/api-constant";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "./button";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  itemsPerPage?: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  hasPaginations?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  hasPaginations = true,
  totalItems = 0,
  itemsPerPage = ITEM_PER_PAGE,
}) => {

    const from = (currentPage - 1) * itemsPerPage + 1;
  const to = from + data.length - 1;
  if (isLoading) {
    return <div className="w-full max-w-full min-h-[50vh] p-5  [&::-webkit-scrollbar]:w-0  bg-white border-2 rounded-xl shadow-md"><AppLoader /></div>;
  }

  if (!data || data.length === 0) {
    return <div className="w-full max-w-full min-h-[50vh] p-5  [&::-webkit-scrollbar]:w-0  bg-white border-2 rounded-xl shadow-md">No Data Available</div>;
 
  }

  return (
    <div className="relative">
      {/* Wrapper for horizontal scrolling */}
      <div className="overflow-x-auto w-full max-w-full min-h-[50vh] pb-5  [&::-webkit-scrollbar]:w-0  bg-white dark:bg-gray-900 border-2 border-gray-50 dark:border-gray-800 rounded-xl shadow-md">
        <table className={` w-full table-auto border-collapse`}>
          <thead className="border-b-4 border-gray-300 px-4 py-2 shadow-md">
            <tr>
              <th
                className={`px-5 py-4 text-left text-sm font-semibold  capitalize tracking-wider`}
              >
                #
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-4 text-left text-sm  font-semibold capitalize tracking-wider`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`"bg-white dark:bg-gray-900 `}>
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={`${onRowClick ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" : ""} border-b-1 border-gray-300 px-4 py-2`}
              >
                <td className={`px-5 py-2.5 text-sm font-normal  whitespace-nowrap`}>
                  {(currentPage - 1) * itemsPerPage + (index + 1)}
                </td>
                {columns.map((column) => (
                  <td key={column.key} className={`px-5 py-2.5 text-sm font-normal  whitespace-nowrap`}>
                    {column.render
                      ? (column.render(row[column.key], row) ?? "-")
                      : row[column.key]
                        ? row[column.key]
                        : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {hasPaginations && (
       

           <div className="flex justify-between items-center mt-4 px-2 py-2 ">
                      <p className="text-xs">
              Showing {from}–{to} of {totalItems}
            </p>
                      <div className="space-x-0 bg-white rounded-xl">
                        <Button
                          variant="outline"
                  
                           className="rounded-r-none border-gray-400 text-t-202224 bg-white"
                          onClick={() => onPageChange(Math.max(currentPage - 1,1))}
              disabled={currentPage === 1}
                        >
                          <ChevronLeftIcon/>
                        </Button>
                        <Button
                          variant="outline"
                          size={"icon"}
                          className="rounded-l-none border-gray-400 text-black bg-white"
                           onClick={() => onPageChange(Math.max(currentPage + 1,1))}
              disabled={currentPage === totalPages}
                        >
                          <ChevronRightIcon/>
                        </Button>
                        </div>
                      
        </div>
      
    )}
    </div>
  );
};

export default DataTable;
