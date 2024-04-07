import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import {
  useSelectedFilterListMutator,
  useSelectedFilterListState,
} from "@/components/store/useSelectedFilterListState";
import { useUserFilter } from "@/components/usecase/useUserFilter";
import { Typography } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import React, { useState } from "react";
import { FilterItem } from "../FilterItem/FilterItem";

const Filter = () => {
  // 再読込処理用
  const condition = useListSearchConditionState();

  const [lastSelectedItem, setLastSelectedItem] = useState<string | null>(null);
  const selectedFilterList = useSelectedFilterListState();
  const { setSelectedFilterList } = useSelectedFilterListMutator();

  const {
    userFilterData: depFilterData,
    hasError: depHasError,
    isLoading: depLoading,
  } = useUserFilter("department", condition);

  const { userFilterData, hasError, isLoading } = useUserFilter(
    "gender",
    condition
  );
  console.log("userFilterData", userFilterData);

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
        <FilterItem filterName="department" filterLabel="部署" />
        <FilterItem filterName="gender" filterLabel="性別" />
      </SimpleTreeView>
    </>
  );
};

export default Filter;
