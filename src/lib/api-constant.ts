import { IQueryParams } from "@schemas/base.schema";
import _ from "lodash"

export enum ApiEndpoints {
  login = "admin/login",
  getArticle = "admin/Article/getArticle",
  createArticle = "admin/Article/createArticle",
  updateArticle = "admin/Article/updateArticle",
  deleteArticle = "admin/Article/deleteArticle",
  getFaqs = "faq/all",
  createFaqs = "faq/add",
  updateFaqs = "faq/update",
  deleteFaqs = "faq/delete",
  getAutoDealership = "admin/AutoDealerShip/allAutoDealerShip",
  createAutoDealership = "admin/AutoDealerShip/addAutoDealerShip",
  updateAutoDealership = "admin/AutoDealerShip/updateAutoDealerShip",
  deleteAutoDealership = "admin/AutoDealerShip/deleteAutoDealerShip",
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

