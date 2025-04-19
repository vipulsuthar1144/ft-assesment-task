import { apiInstance } from "@/config/axios/axios.config";
import { ApiEndpoints } from "@utils/api-constant";

export const FaqsService = {
  getAll: async (signal: AbortSignal) => {
    return await apiInstance.get(ApiEndpoints.getFaqs, {
      signal,
    });
  },
  create: async (signal: AbortSignal, data: {question:string,answer:string}) => {
    return await apiInstance.post(
      `${ApiEndpoints.createFaqs}`,
      data,
      {
        signal,
      }
      
    );
  },
  updateById: async (signal: AbortSignal, id: string, data: {question:string,answer:string}) => {
    
    return await apiInstance.put(
      `${ApiEndpoints.updateFaqs}/${id}`,
data,
      {
        signal,
      }
    );
  },
  deleteById: async (signal: AbortSignal, id: string) => {
    return await apiInstance.delete(`${ApiEndpoints.deleteFaqs}/${id}`, {
      signal,
    });
  },
};
