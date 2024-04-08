import { FilterNameTYpe } from "@/TypeDef";
import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import { useUserFilter } from "@/components/usecase/useUserFilter";
import { TreeItem } from "@mui/x-tree-view";
import React, { useState } from "react";

type Props = {
  filterName: FilterNameTYpe;
  filterLabel: string;
};

export const FilterItem = ({ filterName, filterLabel }: Props) => {
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const condition = useListSearchConditionState();
  const { setListSearchCondition } = useListSearchConditionMutators();

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
            onClick={() => {
              //alert("click " + filterName);

              const toggleFilter = !filterOn;

              setFilterOn(toggleFilter);
              const newCond = { ...condition };
              switch (filterName) {
                case "departmentId":
                case "gender":
                  newCond[filterName] = toggleFilter
                    ? Number(item.filterValue)
                    : undefined;
                  break;
                case "userId":
                case "userName":
                  newCond[filterName] = toggleFilter
                    ? item.filterValue
                    : undefined;
                  break;
                default:
                  break;
              }
              console.log("toggle state:", toggleFilter);
              console.log("new condition:", newCond);
              setListSearchCondition(newCond);
            }}
          ></TreeItem>
        ))
      )}
    </TreeItem>
  );
};
