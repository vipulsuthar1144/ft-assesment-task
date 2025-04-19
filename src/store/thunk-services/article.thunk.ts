import getAsyncThunk from "../getAsyncThunk";
import { IBasePaginationSchema, IBaseSchema, IQueryParams } from "@schemas/base.schema";
import { IArticleSchema } from "@schemas/article.schema";
import { ArticleService } from "@services/article.service";

export const ArticleAPI = {
  getAll: getAsyncThunk<IBaseSchema<IBasePaginationSchema<IArticleSchema>>, IQueryParams>(
    "ArticleAPI/getAll",
    async (filter, signal) => {
      const result = await ArticleService.getAllWithPagination(signal, filter);
      if (result.data) return result.data;
      return null;
    }
  ),
  // getById: getAsyncThunk<IBaseSchema<IProductSchema>, { productId: string }>(
  //   "ProductAPI/getById",
  //   async ({ productId }, signal) => {
  //     const result = await ProductService.getById(signal, productId);
  //     if (result.data) return result.data;
  //     return null;
  //   }
  // ),
  create: getAsyncThunk<IBaseSchema<IArticleSchema>, any>(
    "ArticleAPI/create",
    async (data, signal) => {
      const result = await ArticleService.create(signal, data);
      if (result.data) return result.data;
      return null;
    }
  ),
  updateById: getAsyncThunk<IBaseSchema<IArticleSchema>, { data: {title:string,description:string}; id: string }>(
    "ArticleAPI/updateById",
    async ({ data, id }, signal) => {
      const result = await ArticleService.updateById(signal, id, data);
      if (result.data) return result.data;
      return null;
    }
  ),
  deleteById: getAsyncThunk<IBaseSchema<IArticleSchema>, string>(
    "ArticleAPI/deleteById",
    async (id, signal) => {
      const result = await ArticleService.deleteById(signal, id);
      if (result.data) return result.data;
      return null;
    }
  ),
};
