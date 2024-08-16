// GETかつ値無し（NULL）を取り扱う場合、文字列型の方が都合がよい
export type SearchCondition = {
  userId?: string;
  userName?: string;
  gender?: string;
  departmentId?: string;
  ageFrom?: number;
  ageTo?: number;
  page: number;
  size: number;
};

export type FilterItem = {
  filterValue?: string;
  filterRangeValue?: { from: any; to: any };
  filterLabel?: string;
  count: number;
};

// name
// 社員名
// [
//   {}
// ]
export type FilterElement = {
  name: string;
  label: string;
  count: number;
};
export type ItemFilter = {
  filterName: string;
  filterLable: string;
  filterElements: FilterItem[];
};

export type BasicResponseType = {
  code: string;
  errors: [{ [key: string]: string }];
};

export type PagingModeType = "allRows" | "selectedRows";

export type FilterNameTYpe =
  | keyof Omit<SearchCondition, "page" | "size">
  | "age";

export type FontSizeType = "small" | "medium" | "large";
