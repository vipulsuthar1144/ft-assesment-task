import { apiInstance } from "@/config/axios/axios.config";
import { IQueryParams } from "@schemas/base.schema";
import { ApiEndpoints, parseQueryParams } from "@utils/api-constant";

export const ArticleService = {
  getAllWithPagination: async (signal: AbortSignal, filter: IQueryParams) => {
    return await apiInstance.get(parseQueryParams(ApiEndpoints.getArticle, filter), {
      signal,
    });
  },
  create: async (signal: AbortSignal, data: FormData) => {
    return await apiInstance.post(
      `${ApiEndpoints.createArticle}`,
      data,
      {
        signal,
         headers: {
        "Content-Type": "multipart/form-data",
      },
      }
      
    );
  },
  updateById: async (signal: AbortSignal, id: string, data: {title:string,description:string}) => {
    
    return await apiInstance.put(
      `${ApiEndpoints.updateArticle}/${id}`,
data,
      {
        signal,
      }
    );
  },
  deleteById: async (signal: AbortSignal, id: string) => {
    return await apiInstance.delete(`${ApiEndpoints.deleteArticle}/${id}`, {
      signal,
    });
  },
};
