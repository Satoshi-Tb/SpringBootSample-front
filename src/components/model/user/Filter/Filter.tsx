import { Typography } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import React, { useState } from "react";
import { FilterItem } from "../FilterItem/FilterItem";

const Filter = () => {
  const [lastSelectedItem, setLastSelectedItem] = useState<string | null>(null);

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      console.log("handleItemSelectionToggle", itemId);
      setLastSelectedItem(itemId);
    }
  };

  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        フィルタ
      </Typography>
      <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle}>
        <FilterItem filterName="departmentId" filterLabel="部署" />
        <FilterItem filterName="gender" filterLabel="性別" />
      </SimpleTreeView>
    </>
  );
};

export default Filter;
