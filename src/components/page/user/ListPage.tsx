import { BaseLayout } from "@/components/model/layout";
import React from "react";
import { List } from "@/components/model/user/List";

export const ListPage = () => {
  return (
    <BaseLayout>
      <List />
    </BaseLayout>
  );
};
