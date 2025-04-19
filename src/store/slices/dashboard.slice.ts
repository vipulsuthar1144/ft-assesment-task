import { createSlice } from "@reduxjs/toolkit";
import { IDashboardSchema } from "@schemas/dashboard.schema";
import { DashboardAPI } from "@store/thunk-services/dashboard.thunk";

interface IDashboardSlice {
  isDashboardStatsLoading: boolean;
  isDashboardStatsError: boolean;
  dashboardStatsData: IDashboardSchema | null;
}

const intialState: IDashboardSlice = {
  isDashboardStatsLoading: false,
  isDashboardStatsError: false,
  dashboardStatsData: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: intialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(DashboardAPI.getDashboard.pending, state => {
        state.isDashboardStatsLoading = true;
        state.isDashboardStatsError = false;
      })
      .addCase(DashboardAPI.getDashboard.fulfilled, (state, action) => {
        state.isDashboardStatsLoading = false;
        state.isDashboardStatsError = false;
        state.dashboardStatsData = action.payload.data ?? null;
      })
      .addCase(DashboardAPI.getDashboard.rejected, state => {
        state.isDashboardStatsLoading = false;
        state.isDashboardStatsError = true;
      });
  },
});

export default dashboardSlice.reducer;
