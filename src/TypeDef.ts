export type SearchCondition = {
  userId?: string;
  userName?: string;
  page: number;
  size: number;
};

export type BasicResponseType = {
  code: string;
  errors: [{ [key: string]: string }];
};
