import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import React from "react";

export const Signup = () => {
  const { categoryCodeListData, hasError, isLoading } =
    useCategoryCode("gender");

  if (hasError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {categoryCodeListData?.data.map((item) => (
        <>
          {item.code + "," + item.name}
          <br />
        </>
      ))}
    </>
  );
};
