export type SearchCondition = {
  userId?: string;
  userName?: String;
  page: number;
  size: number;
};

export type BasicResponseType = {
  code: string;
  errors: [{ [key: string]: string }];
};
