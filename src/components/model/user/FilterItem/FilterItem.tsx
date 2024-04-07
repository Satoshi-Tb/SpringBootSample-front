import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import { useUserFilter } from "@/components/usecase/useUserFilter";
import { TreeItem } from "@mui/x-tree-view";
import React from "react";

type Props = {
  filterName: string;
  filterLabel: string;
};

export const FilterItem = ({ filterName, filterLabel }: Props) => {
  const condition = useListSearchConditionState();

  const { userFilterData, hasError, isLoading } = useUserFilter(
    filterName,
    condition
  );

  return (
    <TreeItem itemId={filterName} label={filterLabel}>
      {hasError ? (
        <TreeItem itemId={`${filterName}.error`} label="エラー"></TreeItem>
      ) : isLoading ? (
        <TreeItem
          itemId={`${filterName}.loading`}
          label="ローディング"
        ></TreeItem>
      ) : (
        userFilterData?.data.map((item, idx) => (
          <TreeItem
            key={idx}
            itemId={`${filterName}.${item.filterValue}`}
            label={`${item.filterLabel} (${item.count})`}
          ></TreeItem>
        ))
      )}
    </TreeItem>
  );
};
