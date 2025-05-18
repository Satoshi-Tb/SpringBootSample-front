import React from "react";
import { List as ListImpl } from "./List";

type PropType = {
  isUploading: boolean;
};
export const List = ({ isUploading }: PropType) => {
  return <ListImpl isUploading={isUploading} />;
};
