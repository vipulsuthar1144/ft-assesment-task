import { IBaseSchema } from "@schemas/base.schema";
import { IDashboardSchema } from "@schemas/dashboard.schema";
import { DashbordService } from "@services/dashbord.service";
import getAsyncThunk from "@store/getAsyncThunk";

export const DashboardAPI = {
  getDashboard: getAsyncThunk<IBaseSchema<IDashboardSchema>, void>(
    "DashboardAPI/getDashboard",
    async (_, signal) => {
      const result = await DashbordService.getDashboard(signal);
      if (result.data) return result.data;
      return null;
    }
  ),
};
