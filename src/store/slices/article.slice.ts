
import { createSlice } from "@reduxjs/toolkit";
import { ArticleAPI } from "../thunk-services/article.thunk";
import { IArticleSchema } from "@schemas/article.schema";
import { IPaginationMetaSchema } from "@schemas/base.schema";
import { ITEM_PER_PAGE } from "@utils/api-constant";
import { appendAtIndex } from "@utils/genaralFunctions";

export interface IArticleSliceSchema {
  isArticleLoading: boolean;
  isArticleError: boolean;
  articleList: IArticleSchema[];
  articleData: IArticleSchema | null;
  articleListMetaData: IPaginationMetaSchema;
  // articleCounts: ICountsSchema;
  isArticleCRUDLoading: boolean;
  isArticleCRUDError: boolean;
}

const initialState: IArticleSliceSchema = {
  isArticleLoading: false,
  isArticleError: false,
  articleList: [],
  articleData: null,
  articleListMetaData: {
   totalDocs: 0,
        limit: ITEM_PER_PAGE,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
  },
  isArticleCRUDError: false,
  isArticleCRUDLoading: false,
};

const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {
    resetArticleLoadingState: (state) => {
      state.isArticleLoading = false;
      state.isArticleError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ArticleAPI.getAll.pending, (state) => {
        state.isArticleLoading = true;
        state.isArticleError = false;
      })
      .addCase(ArticleAPI.getAll.fulfilled, (state, action) => {
        state.isArticleLoading = false;
        state.isArticleError = false;
        state.articleList = action.payload.data?.docs ?? [];
        state.articleListMetaData = action.payload.data ?? initialState.articleListMetaData;
      })
      .addCase(ArticleAPI.getAll.rejected, (state) => {
        state.isArticleLoading = false;
        state.isArticleError = true;
      })
      // .addCase(ArticleAPI.getById.pending, (state) => {
      //   state.isArticleLoading = true;
      //   state.isArticleError = false;
      // })
      // .addCase(ArticleAPI.getById.fulfilled, (state, action) => {
      //   state.isArticleLoading = false;
      //   state.isArticleError = false;
      //   state.articleData = action.payload.data ?? null;
      // })
      // .addCase(ArticleAPI.getById.rejected, (state) => {
      //   state.isArticleLoading = false;
      //   state.isArticleError = true;
      // })
      .addCase(ArticleAPI.create.pending, (state) => {
        state.isArticleCRUDLoading = true;
        state.isArticleCRUDError = false;
      })
      .addCase(ArticleAPI.create.fulfilled, (state, action) => {
        state.isArticleCRUDLoading = false;
        state.isArticleCRUDError = false;
        state.articleList = appendAtIndex(state.articleList, action.payload?.data ?? {}, 0);
      })
      .addCase(ArticleAPI.create.rejected, (state) => {
        state.isArticleCRUDLoading = false;
        state.isArticleCRUDError = true;
      })
      .addCase(ArticleAPI.updateById.pending, (state) => {
        state.isArticleCRUDLoading = true;
        state.isArticleCRUDError = false;
      })
      .addCase(ArticleAPI.updateById.fulfilled, (state, action) => {
        state.isArticleCRUDLoading = false;
        state.isArticleCRUDError = false;
        state.articleList = [...state.articleList].map((item) =>
          item._id === action.payload?.data?._id ? (action.payload.data ?? {}) : item
        );
      })
      .addCase(ArticleAPI.updateById.rejected, (state) => {
        state.isArticleCRUDLoading = false;
        state.isArticleCRUDError = true;
      })
      .addCase(ArticleAPI.deleteById.pending, (state) => {
        state.isArticleCRUDLoading = true;
        state.isArticleCRUDError = false;
      })
      .addCase(ArticleAPI.deleteById.fulfilled, (state, action) => {
        state.isArticleCRUDLoading = false;
        state.isArticleCRUDError = false;
        state.articleList = [...state.articleList].filter((item) => item._id !== action.payload.data?._id);
      })
      .addCase(ArticleAPI.deleteById.rejected, (state) => {
        state.isArticleCRUDLoading = false;
        state.isArticleCRUDError = true;
      });
  },
});

export const { resetArticleLoadingState } = articleSlice.actions;

export default articleSlice.reducer;
