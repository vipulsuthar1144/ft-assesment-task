export interface IBaseSchema<T> {
  status?: number
  message?: string
  data?: T | null
}

export interface  IBasePaginationSchema<T> extends IPaginationMetaSchema {
  docs?: T[]
}

export interface IPaginationMetaSchema {
  totalDocs?: number
  limit?: number
  totalPages?: number
  page?: number
  pagingCounter?: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
  prevPage?: any
  nextPage?: any
}


export interface IQueryParams {
  page?: number;
  limit?: number;
}

