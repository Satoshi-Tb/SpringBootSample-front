import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import {
  useSelectedFilterListMutator,
  useSelectedFilterListState,
} from "@/components/store/useSelectedFilterListState";
import { useUserFilter } from "@/components/usecase/useUserFilter";
import { Typography } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import React, { useState } from "react";

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
        <TreeItem itemId="department" label="部署">
          {depHasError ? (
            <TreeItem itemId="department.error" label="エラー"></TreeItem>
          ) : depLoading ? (
            <TreeItem
              itemId="department.loading"
              label="ローディング"
            ></TreeItem>
          ) : (
            depFilterData?.data.map((item, idx) => (
              <TreeItem
                key={idx}
                itemId={`department.${item.filterValue}`}
                label={`${item.filterLabel} (${item.count})`}
              ></TreeItem>
            ))
          )}
        </TreeItem>
        <TreeItem itemId="gender" label="性別">
          {hasError ? (
            <TreeItem itemId="gender.error" label="エラー"></TreeItem>
          ) : isLoading ? (
            <TreeItem itemId="gender.loading" label="ローディング"></TreeItem>
          ) : (
            userFilterData?.data.map((item, idx) => (
              <TreeItem
                key={idx}
                itemId={`gender.${item.filterValue}`}
                label={`${item.filterLabel} (${item.count})`}
              ></TreeItem>
            ))
          )}
        </TreeItem>
      </SimpleTreeView>
    </>
  );
};

export default Filter;
