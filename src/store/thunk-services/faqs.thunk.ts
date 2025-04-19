import { IBaseSchema } from "@schemas/base.schema";
import { IFaqsSchema } from "@schemas/faqs.schema";
import { FaqsService } from "@services/faqs.service";
import getAsyncThunk from "../getAsyncThunk";

export const FaqsAPI = {
  getAll: getAsyncThunk<IBaseSchema<IFaqsSchema[]>, void>(
    "FaqsAPI/getAll",
    async (_, signal) => {
      const result = await FaqsService.getAll(signal);
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
  create: getAsyncThunk<
    IBaseSchema<IFaqsSchema>,
    { question: string; answer: string }
  >("FaqsAPI/create", async (data, signal) => {
    const result = await FaqsService.create(signal, data);
    if (result.data) return result.data;
    return null;
  }),
  updateById: getAsyncThunk<
    IBaseSchema<IFaqsSchema>,
    { data: { question: string; answer: string }; id: string }
  >("FaqsAPI/updateById", async ({ data, id }, signal) => {
    const result = await FaqsService.updateById(signal, id, data);
    if (result.data) return result.data;
    return null;
  }),
  deleteById: getAsyncThunk<IBaseSchema<IFaqsSchema>, string>(
    "FaqsAPI/deleteById",
    async (id, signal) => {
      const result = await FaqsService.deleteById(signal, id);
      if (result.data) return result.data;
      return null;
    }
  ),
};
