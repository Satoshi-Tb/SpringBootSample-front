import React from "react";
import { Condition as ConditionImpl } from "./Condition";

type PropType = {
  isUploading: boolean;
  handleLoadingChange: (isUploading: boolean) => void;
};

export const Condition = ({ isUploading, handleLoadingChange }: PropType) => {
  return (
    <ConditionImpl
      isUploading={isUploading}
      handleLoadingChange={handleLoadingChange}
    />
  );
};
