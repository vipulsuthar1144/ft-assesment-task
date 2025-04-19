
import { createSlice } from "@reduxjs/toolkit";
import { IFaqsSchema } from "@schemas/faqs.schema";
import { appendAtIndex } from "@utils/genaralFunctions";
import { FaqsAPI } from "../thunk-services/faqs.thunk";

export interface IFaqsSliceSchema {
  isFaqsLoading: boolean;
  isFaqsError: boolean;
  faqsList: IFaqsSchema[];
  isFaqsCRUDLoading: boolean;
  isFaqsCRUDError: boolean;
}

const initialState: IFaqsSliceSchema = {
  isFaqsLoading: false,
  isFaqsError: false,
  faqsList: [],
  isFaqsCRUDError: false,
  isFaqsCRUDLoading: false,
};

const faqsSlice = createSlice({
  name: "faqs",
  initialState: initialState,
  reducers: {
    resetFaqsLoadingState: (state) => {
      state.isFaqsLoading = false;
      state.isFaqsError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FaqsAPI.getAll.pending, (state) => {
        state.isFaqsLoading = true;
        state.isFaqsError = false;
      })
      .addCase(FaqsAPI.getAll.fulfilled, (state, action) => {
        state.isFaqsLoading = false;
        state.isFaqsError = false;
        state.faqsList = action.payload?.data ?? [];
      
      })
      .addCase(FaqsAPI.getAll.rejected, (state) => {
        state.isFaqsLoading = false;
        state.isFaqsError = true;
      })
      // .addCase(FaqsAPI.getById.pending, (state) => {
      //   state.isFaqsLoading = true;
      //   state.isFaqsError = false;
      // })
      // .addCase(FaqsAPI.getById.fulfilled, (state, action) => {
      //   state.isFaqsLoading = false;
      //   state.isFaqsError = false;
      //   state.faqsData = action.payload.data ?? null;
      // })
      // .addCase(FaqsAPI.getById.rejected, (state) => {
      //   state.isFaqsLoading = false;
      //   state.isFaqsError = true;
      // })
      .addCase(FaqsAPI.create.pending, (state) => {
        state.isFaqsCRUDLoading = true;
        state.isFaqsCRUDError = false;
      })
      .addCase(FaqsAPI.create.fulfilled, (state, action) => {
        state.isFaqsCRUDLoading = false;
        state.isFaqsCRUDError = false;
        state.faqsList = appendAtIndex(state.faqsList, action.payload?.data ?? {}, 0);
      })
      .addCase(FaqsAPI.create.rejected, (state) => {
        state.isFaqsCRUDLoading = false;
        state.isFaqsCRUDError = true;
      })
      .addCase(FaqsAPI.updateById.pending, (state) => {
        state.isFaqsCRUDLoading = true;
        state.isFaqsCRUDError = false;
      })
      .addCase(FaqsAPI.updateById.fulfilled, (state, action) => {
        state.isFaqsCRUDLoading = false;
        state.isFaqsCRUDError = false;
        state.faqsList = [...state.faqsList].map((item) =>
          item._id === action.payload?.data?._id ? (action.payload.data ?? {}) : item
        );
      })
      .addCase(FaqsAPI.updateById.rejected, (state) => {
        state.isFaqsCRUDLoading = false;
        state.isFaqsCRUDError = true;
      })
      .addCase(FaqsAPI.deleteById.pending, (state) => {
        state.isFaqsCRUDLoading = true;
        state.isFaqsCRUDError = false;
      })
      .addCase(FaqsAPI.deleteById.fulfilled, (state, action) => {
        state.isFaqsCRUDLoading = false;
        state.isFaqsCRUDError = false;
        state.faqsList = [...state.faqsList].filter((item) => item._id !== action.payload.data?._id);
      })
      .addCase(FaqsAPI.deleteById.rejected, (state) => {
        state.isFaqsCRUDLoading = false;
        state.isFaqsCRUDError = true;
      });
  },
});

export const { resetFaqsLoadingState } = faqsSlice.actions;

export default faqsSlice.reducer;
