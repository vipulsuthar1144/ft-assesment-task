import { IQueryParams } from "@schemas/base.schema";
import _ from "lodash"

export enum ApiEndpoints {
  login = "login",
  getArticle = "Article/getArticle",
  createArticle = "Article/createArticle",
  updateArticle = "Article/updateArticle",
  deleteArticle = "Article/deleteArticle"
}

export const ITEM_PER_PAGE = 50

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL


export const parseQueryParams = <U extends IQueryParams>(endpoint: string, filter: U) => {
  const queryParams = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (!_.isEmpty(String(value)) && value != undefined) {
      
        queryParams.append(key, value);
     
    }
  });

  return `${endpoint}?${queryParams.toString()}`;
};

