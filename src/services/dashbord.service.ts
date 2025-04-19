import { apiInstance } from "@config/axios/axios.config";
import { ApiEndpoints } from "@utils/api-constant";

export const DashbordService = {
  getDashboard: async (signal: AbortSignal) => {
    return await apiInstance.get(`${ApiEndpoints.dashboard}`, {
      signal,
    });
  },
};
