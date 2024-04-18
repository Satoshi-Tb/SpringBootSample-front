import { Typography } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import React, { useState } from "react";
import { RangeFilterItem } from "../FilterItem/RangeFilterItem";
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
      <SimpleTreeView
        onItemSelectionToggle={handleItemSelectionToggle}
        onExpandedItemsChange={(event, itemIds) => {
          console.log("onExpandedItemsChange", itemIds);
        }}
      >
        <FilterItem filterItemName="departmentId" filterLabel="部署" />
        <FilterItem filterItemName="gender" filterLabel="性別" />
        <FilterItem filterItemName="userName" filterLabel="ユーザー名" />
        <RangeFilterItem filterName="age" filterLabel="年齢" />
      </SimpleTreeView>
    </>
  );
};

export default Filter;
